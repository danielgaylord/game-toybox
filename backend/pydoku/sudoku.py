from region import Region
from cell import Cell

# A class that represents a retangular sudoku puzzle with rectangular internal regions
class Sudoku():
    
    #init/constructor
    def __init__(self, values, regions_array):
        self.regions = []
        for i in range(0, len(set([y for x in regions_array for y in x]))):
            self.regions.append(Region())
        for i, v in enumerate(values):
            cell = Cell(int(v))
            for r in regions_array[i]:
                self.regions[r].cells.append(cell)
        for r in self.regions:
            r.set_size()
            r.set_options()

    # determine the total unknown cells in the sudoku puzzle
    # as cells can be in multiple regions, overlaps will occur
    def unknowns(self):
        count = 0
        for r in self.regions:
            count += r.unknowns()
        return count

    # the brains of the operation...
    # first, make sure each cell only lists possible options
    # next, continue to try solving each region until no changes have been made
    # continue doing this until either we are 'stuck' there are no unknowns
    def solve(self):
        for r in self.regions:
            r.remove_options()
        region_unknowns = self.unknowns()
        done = 0
        while region_unknowns > 0 and done == 0:
            for r in self.regions:
                cell_unknowns = r.unknowns()
                move = 0
                while cell_unknowns > 0 and move == 0:
                    r.solve()
                    new_unknowns = r.unknowns()
                    if cell_unknowns == new_unknowns:
                        move = 1
                    cell_unknowns = new_unknowns
            new_unknowns = self.unknowns()
            if region_unknowns == new_unknowns:
                done = 1
            region_unknowns = new_unknowns

    # print the sudoku puzzle to the terminal
    # HUGE ASSUMPTION: the puzzle is rectangular (no twin sudokus) and that the regions are listed as rows, columns, 'houses', etc
    def print(self):
        print("-------------")
        for row in range(0, self.regions[0].region_size):
            print("|", end = '')
            for column in range(0, self.regions[self.regions[0].region_size].region_size):
                if self.regions[row].cells[column].value != 0:
                    print(self.regions[row].cells[column].value, end = '')
                else:
                    print(" ", end = '')
                if (column + 1) % 3 == 0:
                    print("|", end = '')
            print()
            if (row + 1) % 3 == 0:
                print("-------------")

# For testing purposes
# if __name__ == "__main__":
#     value_string = ("800100000"
#                   "000003069"
#                   "000478030"
#                   "040000000"
#                   "000804103"
#                   "000000607"
#                   "500007008"
#                   "007600500"
#                   "000035090")
    
#     region_array = [[0, 9, 18], [0, 10, 18], [0, 11, 18], [0, 12, 19], [0, 13, 19], [0, 14, 19], [0, 15, 20], [0, 16, 20], [0, 17, 20], 
#                     [1, 9, 18], [1, 10, 18], [1, 11, 18], [1, 12, 19], [1, 13, 19], [1, 14, 19], [1, 15, 20], [1, 16, 20], [1, 17, 20], 
#                     [2, 9, 18], [2, 10, 18], [2, 11, 18], [2, 12, 19], [2, 13, 19], [2, 14, 19], [2, 15, 20], [2, 16, 20], [2, 17, 20], 
#                     [3, 9, 21], [3, 10, 21], [3, 11, 21], [3, 12, 22], [3, 13, 22], [3, 14, 22], [3, 15, 23], [3, 16, 23], [3, 17, 23], 
#                     [4, 9, 21], [4, 10, 21], [4, 11, 21], [4, 12, 22], [4, 13, 22], [4, 14, 22], [4, 15, 23], [4, 16, 23], [4, 17, 23], 
#                     [5, 9, 21], [5, 10, 21], [5, 11, 21], [5, 12, 22], [5, 13, 22], [5, 14, 22], [5, 15, 23], [5, 16, 23], [5, 17, 23], 
#                     [6, 9, 24], [6, 10, 24], [6, 11, 24], [6, 12, 25], [6, 13, 25], [6, 14, 25], [6, 15, 26], [6, 16, 26], [6, 17, 26], 
#                     [7, 9, 24], [7, 10, 24], [7, 11, 24], [7, 12, 25], [7, 13, 25], [7, 14, 25], [7, 15, 26], [7, 16, 26], [7, 17, 26], 
#                     [8, 9, 24], [8, 10, 24], [8, 11, 24], [8, 12, 25], [8, 13, 25], [8, 14, 25], [8, 15, 26], [8, 16, 26], [8, 17, 26]]

#     test = Sudoku(value_string, region_array)
#     print("Number of Regions:", len(test.regions))
#     for x in test.regions:
#         print("Region Size:", x.region_size)
#         for y in x.cells:
#             print("Cell Value: " + str(y.value) + "; Cell Options: " + str(y.options))
#     print("Number of Unknowns:", test.unknowns())
#     test.print()
