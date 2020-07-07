const { createHash } = require("crypto");

exports.random = async (Min, Max) =>
{
    var Modulo = Max - Min + 1;
    var Number = createHash("sha256").update(`${Date.now().toString()}${Math.random()}`).digest("hex");
    var Result = 0;

    for(var Index = 0; Index < Number.length; Index++)
    {
        Result = (Result * 16 + parseInt(Number[Index], 16)) % Modulo;
    }

    return Min + Result;
}
