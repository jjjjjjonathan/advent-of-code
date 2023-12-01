import os


def parse_input(path_to_file):
    with open(path_to_file, encoding="utf-8") as f:
        contents = f.readlines()
        return contents


def split_data(data, number):
    line_breaks = ""
    count = 0

    while count < number:
        line_breaks += "\n"
        count += 1

    return 0


print(os.listdir())
print(parse_input("../data/01-sample.txt"))
