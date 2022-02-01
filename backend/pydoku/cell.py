# A class that represents one cell in a sudoku puzzle
class Cell():

    # init/constructor
    def __init__(self, value):
        self.value = value
        self.options = []

    # determine the potential values based on the size of the region
    def set_options(self, region_size):
        if self.value == 0:
            self.options = [x for x in range(1, region_size + 1) if self.value == 0]

# For testing purposes
# if __name__ == "__main__":
#     test = Cell(1)
#     print("Value:", test.value)
#     test.set_options(9)
#     print("Options:", test.options)
