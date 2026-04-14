from browser import window, document
import sys

class MyOutput:
    def write(self, data):
        if data and data.strip():
            out = document["output"]
            out.text += "\n✅ [PYTHON OUTPUT] " + data.strip()
            out.scrollTop = out.scrollHeight

sys.stdout = MyOutput()

def run_dynamic_code(*args):
    code = document["hiddenPythonCode"].value
    try:
        exec_globals = {}
        exec(code, exec_globals)
    except Exception as e:
        out = document["output"]
        out.text += f"\n❌ [PYTHON ERROR] {str(e)}"
        out.scrollTop = out.scrollHeight

window.executePythonLogic = run_dynamic_code