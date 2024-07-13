import os
import sys

if (sys.argv[1] == ""):
    print("ERR: No commit message supplied.")
    exit(1)

os.system("git add . && git commit -m \"" + sys.argv[1] + "\" && git push")