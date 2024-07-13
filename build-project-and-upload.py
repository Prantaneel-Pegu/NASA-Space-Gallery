import os
import sys

if (len(sys.argv) < 2):
    print("ERR: No commit message supplied.")
    exit(1)

os.system("python ./build-project.py && python ./git-upload.py \"" + sys.argv[1] + "\"")