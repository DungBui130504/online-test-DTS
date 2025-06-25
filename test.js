const { hashPassword } = require("./helper/auth")

async function test() {
    const hashedPass = await hashPassword('admin123');
    console.log(hashedPass);
}

test();
