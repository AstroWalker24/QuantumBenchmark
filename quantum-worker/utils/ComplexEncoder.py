import json


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        print("ComplexEncoder initialized")
        if isinstance(obj, complex):
            print(f"Encoding complex number: {obj}")
            return {
                "__complex__": True,
                "real": obj.real,
                "imag": obj.imag,
            }
        print("Not a Python complex number")
        return super().default(obj)
