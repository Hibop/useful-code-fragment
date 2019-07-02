// 不再需要根据一个条件创建两个不同的对象，可以使用展开运算符号来处理。

const getUser = (emailIncluded) => {
  return {
    name: 'John',
    surname: 'Doe',
    ...emailIncluded && { email : 'john@doe.com' }
  }
}

const user = getUser(true);
console.log(user); // outputs { name: "John", surname: "Doe", email: "john@doe.com" }

const userWithoutEmail = getUser(false);
console.log(userWithoutEmail); // outputs { name: "John", surname: "Doe" }

// 数组也可以条件解构

const getlists = (bool) => {
  return [
    34,
    'hello',
    'world',
    ...bool && [3, 4, 'new array']
  ];
}
