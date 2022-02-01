from itertools import combinations

from cell import Cell

# A class that represents a region of a sudoku puzzle of undefined shape
class Region():

    #init/constructor
    def __init__(self):
        self.region_size = 0
        self.cells = []

    # determine the size of the region by the number of cells
    def set_size(self):
        self.region_size = len(self.cells)

    # go through each cell in the region and set their potential values based on the size of the region
    # as cells can be in multiple regions, cells will have potential values based on the largest region they are in
    def set_options(self):
        for c in self.cells:
            if c.value == 0 or len(c.options) > self.region_size:
                c.options.clear()
                c.set_options(self.region_size)

    # loop through combinations of cells in the region to reduce the options of each cell based on cells with known values
    def remove_options(self):
        for c1, c2 in combinations(self.cells, 2):
            if c1.value != c2.value:
                if c1.value == 0 and c1.options.count(c2.value) > 0:
                    c1.options.remove(c2.value)
                if c2.value == 0 and c2.options.count(c1.value) > 0:
                    c2.options.remove(c1.value)

    # loop through cells in the region to find cells with only one option and set the cell's value to that option
    def naked_single(self):
        for c in self.cells:
            if len(c.options) == 1:
                c.value = c.options.pop()
        self.remove_options()

    # loop through combinations of cells in the region to see if 2 cells have the same 2 options, if so remove from all other cells
    def naked_pair(self):
        pair = []
        for c1, c2 in combinations(self.cells, 2):
            if len(c1.options) == 2 and len(c2.options) == 2 and c1.options == c2.options:
                pair = c1.options
        if len(pair) == 2:
            for c in self.cells:
                if c.value == 0 and c.options != pair:
                    for p in pair:
                        if p in c.options:
                            c.options.remove(p)
            self.remove_options()

    # determine if a option only occurs in one cell in the region and set that cell's value to that option
    def hidden_single(self):
        total_options = [y for x in self.cells for y in x.options]
        for i in range(1, self.region_size + 1):
            if total_options.count(i) == 1:
                for c in self.cells:
                    if c.value == 0 and c.options.count(i) > 0:
                        c.value = i
                        c.options.clear()
        self.remove_options()

    # solve the region as best as possible with the known information
    def solve(self):
        self.naked_single()
        self.naked_pair()
        self.hidden_single()

    # return how many cells in the region still have an unknown value
    def unknowns(self):
        count = 0
        for c in self.cells:
            if c.value == 0:
                count += 1
        return count

# For testing purposes
if __name__ == "__main__":
    test = Region()
    test.cells.append(Cell(0))
    test.cells.append(Cell(2))
    test.cells.append(Cell(0))
    test.cells.append(Cell(4))
    test.cells.append(Cell(0))
    test.set_size()
    test.set_options()
    test.remove_options()
    test.naked_single()
    test.hidden_single()
    test.naked_pair()
    print("Region Size:", test.region_size)
    for x in test.cells:
        if x.value == 0:
            print("Cell:", x.options)
        else:
            print("Cell:", x.value)
    print("Unknowns:", test.unknowns())
