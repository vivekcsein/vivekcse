---
description: "100 logical JavaScript interview questions with runnable examples, outputs and explanations: tricky output, closures, async, arrays, algorithms and prototypes."
date: 2026-09-12
keywords: [javascript, interview, closures, async, algorithms, prototypes]
featured: false
---

# Top 100 Logical JavaScript Interview Questions (2026 Edition)

> Written for **junior to mid-level developers** preparing for JS interviews.
> Every question has a runnable example, the actual output, and a plain-English explanation.
> Comments use `// comment` style throughout to explain every step.

---

## Categories at a glance

| #   | Category                              | Questions |
| --- | ------------------------------------- | --------- |
| 1   | Tricky Output — What will this print? | 1 – 25    |
| 2   | Closures & Scope                      | 26 – 40   |
| 3   | Async, Promises & Event Loop          | 41 – 55   |
| 4   | Arrays & Objects                      | 56 – 70   |
| 5   | Algorithms & Logic                    | 71 – 85   |
| 6   | Prototypes, Classes & `this`          | 86 – 92   |
| 7   | Real-World Utility Functions          | 93 – 100  |

---

## Part 1 — Tricky Output: What will this print? (Q1–25)

These are the most common "gotcha" questions interviewers throw at you.
They test whether you _really_ understand how JS works under the hood.

---

### Q1 — `var` inside a `for` loop with `setTimeout`

```javascript
// Classic trap question — almost every interviewer asks this
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // What does this print?
  }, 0);
}

// OUTPUT:
// 3
// 3
// 3

// WHY?
// var is function-scoped, NOT block-scoped.
// By the time the setTimeout callback runs (after the loop finishes),
// there is only ONE 'i' variable shared by all 3 callbacks.
// The loop already ran to completion, so i = 3 for all three.

// FIX 1: Use let (block-scoped, creates a new i for each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // prints 0, 1, 2 — correct!
  }, 0);
}

// FIX 2: Use an IIFE to capture i at each step
for (var i = 0; i < 3; i++) {
  (function (j) {
    // j is a new variable captured in this function's scope
    setTimeout(function () {
      console.log(j); // prints 0, 1, 2
    }, 0);
  })(i); // pass current i as j immediately
}
```

---

### Q2 — Hoisting with `var` and function declarations

```javascript
// JS hoists declarations to the top before any code runs
console.log(a); // What prints here?
console.log(foo); // And here?

var a = 5;

function foo() {
  return "I am foo";
}

// OUTPUT:
// undefined  ← 'a' is hoisted but not yet assigned
// [Function: foo] ← function declarations are FULLY hoisted

// WHY?
// Think of it as JS doing this behind the scenes:
//
// var a;           ← declaration hoisted, value is undefined
// function foo() { ... } ← entire function hoisted
//
// console.log(a)   → undefined (declared but no value yet)
// console.log(foo) → [Function: foo] (fully available)
// a = 5;           ← assignment stays in place
```

---

### Q3 — `let` and the Temporal Dead Zone (TDZ)

```javascript
// Unlike var, let/const cannot be accessed before their declaration
console.log(x); // What happens?

let x = 10;

// OUTPUT:
// ReferenceError: Cannot access 'x' before initialization

// WHY?
// let/const are hoisted too, but they live in a "Temporal Dead Zone"
// from the start of the block until the line where they're declared.
// Touching them in the TDZ throws an error instead of returning undefined.
// This is actually a FEATURE — it catches bugs that var would silently swallow.
```

---

### Q4 — `typeof null` — the famous JS bug

```javascript
console.log(typeof null); // What prints?
console.log(typeof undefined); // And this?
console.log(null === undefined); // And this?
console.log(null == undefined); // And this?

// OUTPUT:
// "object"     ← This is a BUG from 1995, kept for backward compatibility
// "undefined"
// false        ← strict equality, different types
// true         ← loose equality, JS treats null and undefined as equal

// PRACTICAL TIP:
// Never check for null with typeof — use === null instead
if (value === null) {
  /* correct null check */
}
if (value == null) {
  /* catches both null AND undefined — sometimes useful */
}
```

---

### Q5 — `NaN` is the weirdest value in JS

```javascript
console.log(typeof NaN); // What type is NaN?
console.log(NaN === NaN); // Is NaN equal to itself?
console.log(NaN == NaN); // Even with loose equality?
console.log(isNaN("hello")); // Is the string "hello" NaN?
console.log(Number.isNaN("hello")); // What about this?

// OUTPUT:
// "number"  ← NaN is ironically of type "number"
// false     ← NaN is the ONLY value in JS not equal to itself
// false     ← still false
// true      ← isNaN() coerces the string to NaN first, then checks
// false     ← Number.isNaN() checks WITHOUT coercion — more reliable!

// BEST PRACTICE: Always use Number.isNaN() instead of isNaN()
// because isNaN("abc") === true is misleading
```

---

### Q6 — Type coercion with `+` operator

```javascript
// The + operator does TWO things: addition and string concatenation
// JS decides which one based on the types involved

console.log(1 + "2"); // number + string
console.log("1" + 2); // string + number
console.log(1 + 2 + "3"); // number + number + string
console.log("3" + 1 + 2); // string + number + number

// OUTPUT:
// "12"   ← number is converted to string, then concatenated
// "12"   ← same thing, order doesn't matter here
// "33"   ← 1+2 = 3 (both numbers), then 3+"3" = "33"
// "312"  ← "3"+1 = "31", then "31"+2 = "312" (left to right)

// RULE: As soon as one operand is a string, + becomes concatenation
// for the rest of the chain (evaluated left to right)
```

---

### Q7 — Loose equality (`==`) type coercion traps

```javascript
// These all seem wrong but are all TRUE — classic interview gotchas
console.log(0 == false); // number vs boolean
console.log("" == false); // string vs boolean
console.log(0 == ""); // number vs string
console.log([] == false); // array vs boolean
console.log(null == 0); // null vs number
console.log(null == false); // null vs boolean

// OUTPUT:
// true   ← false is coerced to 0, then 0 == 0 is true
// true   ← false → 0, "" → 0, then 0 == 0
// true   ← "" → 0, so 0 == 0
// true   ← [] → "" → 0, false → 0, so 0 == 0
// false  ← null only equals null or undefined, nothing else
// false  ← same rule, null is special

// LESSON: Just use === always. Seriously.
```

---

### Q8 — What does `[]+ []` and `[] + {}` produce?

```javascript
console.log([] + []); // two empty arrays added together
console.log([] + {}); // array + object
console.log({} + []); // object + array (be careful here!)

// OUTPUT:
// ""            ← [] converts to "", "" + "" = ""
// "[object Object]"  ← [] → "", {} → "[object Object]"
// "[object Object]"  ← In node/console: {} is treated as empty object
//                      (In some contexts {} is parsed as empty block, giving 0 + [] = "0")

// WHY?
// When + is used on non-primitives, JS calls .toString() or .valueOf()
// [].toString()  → ""
// {}.toString()  → "[object Object]"

// This is mostly a "gotcha" question, not something you write in real code.
```

---

### Q9 — `typeof` an undeclared variable doesn't throw

```javascript
// This would throw: console.log(undeclaredVar) → ReferenceError
// But typeof is special — it's safe to use even on undeclared names

console.log(typeof undeclaredVar); // variable was never declared
console.log(typeof undefined);
console.log(typeof function () {});

// OUTPUT:
// "undefined"  ← typeof is safe even for variables that don't exist
// "undefined"
// "function"   ← functions have their own typeof value

// PRACTICAL USE: Check if an optional global exists safely
if (typeof window !== "undefined") {
  // we're in a browser environment
}
```

---

### Q10 — Event loop order: `setTimeout` vs Promises

```javascript
// This tests whether you understand microtasks vs macrotasks
console.log("1 — sync start");

setTimeout(() => {
  console.log("2 — setTimeout"); // macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log("3 — promise .then"); // microtask queue
});

console.log("4 — sync end");

// OUTPUT:
// "1 — sync start"
// "4 — sync end"
// "3 — promise .then"   ← microtasks run BEFORE macrotasks
// "2 — setTimeout"      ← macrotask runs last

// WHY?
// Order: synchronous code → microtasks (Promises) → macrotasks (setTimeout)
// Even setTimeout(fn, 0) waits until all microtasks are done
```

---

### Q11 — Chained Promises and `.then` order

```javascript
console.log("start");

Promise.resolve(1)
  .then((val) => {
    console.log("then 1:", val); // receives 1
    return val + 1; // passes 2 to next .then
  })
  .then((val) => {
    console.log("then 2:", val); // receives 2
    return val + 1;
  })
  .then((val) => {
    console.log("then 3:", val); // receives 3
  });

console.log("end");

// OUTPUT:
// "start"
// "end"
// "then 1: 1"
// "then 2: 2"
// "then 3: 3"

// WHY?
// 1. Synchronous code runs first: "start", "end"
// 2. Then microtasks (promises) run in order
// 3. Each .then receives the RETURN VALUE of the previous .then
```

---

### Q12 — Nested `setTimeout` vs `Promise` order

```javascript
// Advanced: mixing timeouts and promises at multiple levels
setTimeout(() => console.log("timeout 1"), 0);

Promise.resolve()
  .then(() => {
    console.log("promise 1");
    setTimeout(() => console.log("timeout 2"), 0); // scheduling a new timeout from inside a promise
  })
  .then(() => console.log("promise 2"));

setTimeout(() => console.log("timeout 3"), 0);

// OUTPUT:
// "promise 1"
// "promise 2"
// "timeout 1"
// "timeout 3"
// "timeout 2"

// WHY?
// 1. All microtasks (promise 1, promise 2) run first
// 2. During "promise 1", timeout 2 is ADDED to the macrotask queue
//    → so it goes AFTER timeout 1 and 3 which were already queued
// 3. Macrotasks execute in order: timeout 1, 3, then timeout 2
```

---

### Q13 — Function hoisting wins over variable hoisting

```javascript
console.log(typeof foo); // What is foo at this point?

var foo = "I am a string";

function foo() {
  return "I am a function";
}

console.log(typeof foo); // And now?

// OUTPUT:
// "function"  ← function declaration wins over var during hoisting
// "string"    ← after assignment, foo becomes the string

// WHY?
// During hoisting, function declarations take priority over var declarations.
// The final order JS "sees" it:
// function foo() { ... }  ← hoisted first
// var foo;                ← declaration already exists, ignored
// console.log(typeof foo) → "function"
// foo = "I am a string"   ← assignment overwrites the function
// console.log(typeof foo) → "string"
```

---

### Q14 — Short-circuit evaluation in `&&` and `||`

```javascript
// && returns the first FALSY value, or the last value if all are truthy
console.log(1 && 2 && 3); // all truthy
console.log(1 && null && 3); // null is falsy, stops there
console.log(false && "never"); // stops at false

// || returns the first TRUTHY value, or the last if all are falsy
console.log(null || undefined || 0 || "hello"); // first truthy
console.log(false || "" || 0); // all falsy, returns last

// OUTPUT:
// 3         ← last value (all truthy, && returns last one)
// null      ← first falsy value
// false     ← first falsy value
// "hello"   ← first truthy value
// 0         ← all falsy, || returns the LAST one

// REAL-WORLD USE:
const user = null;
const name = user && user.name; // safe: won't throw if user is null
const display = name || "Guest"; // fallback value
```

---

### Q15 — Nullish coalescing `??` vs `||`

```javascript
// ?? returns right side ONLY if left is null or undefined
// || returns right side for ANY falsy value (0, "", false, null, undefined)

const count = 0;
console.log(count || 10); // || sees 0 as falsy
console.log(count ?? 10); // ?? sees 0 as a valid value

const label = "";
console.log(label || "default"); // || sees "" as falsy
console.log(label ?? "default"); // ?? sees "" as a valid value

// OUTPUT:
// 10        ← || treats 0 as falsy, falls back to 10
// 0         ← ?? only falls back for null/undefined
// "default" ← || treats "" as falsy
// ""        ← ?? keeps empty string as a valid value

// LESSON: Use ?? when 0, "", or false are meaningful values in your app
// (e.g. a score of 0, an empty input field)
```

---

### Q16 — The `delete` operator

```javascript
const obj = { a: 1, b: 2, c: 3 };

console.log(delete obj.b); // returns true/false
console.log(obj);

const arr = [1, 2, 3];
delete arr[1]; // delete from array
console.log(arr);
console.log(arr.length); // does length change?

// OUTPUT:
// true
// { a: 1, c: 3 }          ← b is gone
// [1, empty, 3]            ← index 1 becomes a "hole" (undefined)
// 3                        ← length does NOT change!

// LESSON: delete on an array index doesn't shrink the array.
// Use .splice() to actually remove an element and update length.
arr.splice(1, 1); // → [1, 3] — this is what you actually want
```

---

### Q17 — Object property shorthand and computed keys

```javascript
const key = "name";
const value = "Alice";

// Computed property key using []
const obj = {
  [key]: value, // dynamic key — uses the VALUE of 'key'
  [`${key}Length`]: value.length, // template literal as key
  age: 30,
};

console.log(obj);

// OUTPUT:
// { name: "Alice", nameLength: 5, age: 30 }

// ALSO: Shorthand when key and variable name match
const x = 1,
  y = 2;
const point = { x, y }; // same as { x: x, y: y }
console.log(point); // { x: 1, y: 2 }
```

---

### Q18 — Spread vs Rest — same syntax, different purposes

```javascript
// SPREAD: expands an array/object
function add(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(add(...nums)); // spreads array into arguments

// REST: collects multiple arguments INTO an array
function sum(...args) {
  // args is now an actual array [1, 2, 3, 4, 5]
  return args.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// OUTPUT:
// 6   ← add(1, 2, 3)
// 15  ← 1+2+3+4+5

// SPREAD in objects
const defaults = { theme: "light", lang: "en" };
const userPrefs = { lang: "fr", fontSize: 14 };
const config = { ...defaults, ...userPrefs }; // later keys win
console.log(config);
// { theme: "light", lang: "fr", fontSize: 14 }
```

---

### Q19 — Destructuring with defaults and renaming

```javascript
// Object destructuring with rename and default
const user = { name: "Bob", age: 25 };

const {
  name: userName, // rename 'name' to 'userName'
  age = 18, // default if age is undefined
  role = "viewer", // default for a missing key
} = user;

console.log(userName); // "Bob"
console.log(age); // 25 (exists, default ignored)
console.log(role); // "viewer" (missing from object, default used)

// Array destructuring with skip
const [first, , third] = [10, 20, 30]; // skip index 1
console.log(first); // 10
console.log(third); // 30

// Swap variables without a temp variable
let a = 1,
  b = 2;
[a, b] = [b, a]; // ← clean swap using destructuring
console.log(a, b); // 2 1
```

---

### Q20 — Optional chaining `?.` deep access

```javascript
const data = {
  user: {
    profile: {
      avatar: "https://example.com/img.png",
    },
  },
};

// Without optional chaining — crashes if any level is null/undefined
// console.log(data.user.profile.bio.text); // TypeError!

// With optional chaining — returns undefined instead of crashing
console.log(data.user?.profile?.avatar); // "https://example.com/img.png"
console.log(data.user?.profile?.bio?.text); // undefined (no crash)
console.log(data.user?.address?.city); // undefined

// Works with methods and arrays too
const arr = null;
console.log(arr?.[0]); // undefined (no crash)
console.log(arr?.map); // undefined (no crash)

// Combine with ?? for fallback
const city = data.user?.address?.city ?? "Unknown City";
console.log(city); // "Unknown City"
```

---

### Q21 — `in` operator vs `hasOwnProperty`

```javascript
const parent = { inherited: true };
const child = Object.create(parent); // child's prototype is parent
child.own = "mine";

// 'in' checks the object AND its prototype chain
console.log("own" in child); // true
console.log("inherited" in child); // true ← comes from prototype!

// hasOwnProperty checks ONLY the object itself, not prototype
console.log(child.hasOwnProperty("own")); // true
console.log(child.hasOwnProperty("inherited")); // false ← correct!

// OUTPUT:
// true
// true
// true
// false

// LESSON: Use hasOwnProperty (or Object.hasOwn() — the modern version)
// when you want to check a property exists directly on the object
console.log(Object.hasOwn(child, "inherited")); // false — same as hasOwnProperty
```

---

### Q22 — Comma operator (you've probably never used this intentionally)

```javascript
// The comma operator evaluates each expression and returns the LAST one
const result = (1, 2, 3, 4, 5);
console.log(result); // 5 — only the last value is returned

// This is sometimes used in for loop tricks
for (let i = 0, j = 10; i < 3; i++, j--) {
  // i and j update together — comma lets you run two expressions
  console.log(i, j);
}

// OUTPUT:
// 5
// 0 10
// 1 9
// 2 8
```

---

### Q23 — What does `void` do?

```javascript
// void evaluates an expression and always returns undefined
console.log(void 0); // undefined
console.log(void "hello"); // undefined
console.log(void (1 + 1)); // undefined

// Common use: void(0) is used in old HTML href to prevent navigation
// <a href="javascript:void(0)">Click me</a>

// Modern use: void before a Promise to intentionally ignore its result
// (prevents "Promise not handled" warnings in some linters)
async function fire() {
  /* ... */
}
void fire(); // call it but deliberately don't await or chain it
```

---

### Q24 — Implicit `return` in arrow functions

```javascript
// Arrow functions with body {} need an explicit return statement
const add1 = (a, b) => {
  return a + b; // explicit return
};

// Arrow functions WITHOUT {} implicitly return the expression
const add2 = (a, b) => a + b; // implicit return

// Returning an OBJECT literal needs parentheses to avoid {} ambiguity
const makeUser = (name) => ({ name, role: "admin" }); // wrapping in ()

// Without parentheses, JS thinks the {} is a function body!
const broken = (name) => { name, role: "admin" }; // returns undefined!

console.log(add1(1, 2)); // 3
console.log(add2(1, 2)); // 3
console.log(makeUser("Alice")); // { name: "Alice", role: "admin" }
console.log(broken("Alice"));  // undefined ← common mistake!
```

---

### Q25 — `arguments` object vs rest params

```javascript
// Old way: 'arguments' is available in regular functions
function oldWay() {
  console.log(arguments); // array-like object, NOT a real array
  console.log(Array.isArray(arguments)); // false!
  // Can't use .map, .filter etc directly
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

// Modern way: rest params give you a REAL array
function modernWay(...nums) {
  console.log(Array.isArray(nums)); // true
  return nums.reduce((a, b) => a + b, 0); // can use all array methods
}

// Arrow functions do NOT have 'arguments' at all!
const arrowFn = () => {
  // console.log(arguments) ← ReferenceError!
};

console.log(oldWay(1, 2, 3)); // 6
console.log(modernWay(1, 2, 3)); // 6
```

---

## Part 2 — Closures & Scope (Q26–40)

These questions test whether you understand how JavaScript keeps track of variables
and how functions "remember" their outer scope.

---

### Q26 — Build a counter using closures

```javascript
// QUESTION: Create a function that returns a counter with increment, decrement, and reset.
// The count variable should be private (not accessible from outside).

function createCounter(initialValue = 0) {
  // This variable is "closed over" — private to this function
  let count = initialValue;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    reset() {
      count = initialValue; // goes back to starting value
      return count;
    },
    getCount() {
      return count; // read-only access
    },
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.reset()); // 10
console.log(counter.count); // undefined — can't access directly!
```

---

### Q27 — Fix the classic `var` in loop closure problem

```javascript
// QUESTION: Make this log 0, 1, 2 instead of 3, 3, 3

// BROKEN VERSION (using var)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3

// SOLUTION 1: switch to let (simplest fix)
for (let i = 0; i < 3; i++) {
  // let creates a brand-new 'i' for EACH loop iteration
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2

// SOLUTION 2: IIFE to capture a snapshot of i
for (var i = 0; i < 3; i++) {
  (function (captured) {
    // 'captured' is a new variable local to this function call
    setTimeout(() => console.log(captured), 100);
  })(i); // immediately call the function with current i
}
// Prints: 0, 1, 2

// SOLUTION 3: Use bind to capture i
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 100);
}
// Prints: 0, 1, 2
```

---

### Q28 — Memoization using closures

```javascript
// QUESTION: Write a memoize function that caches results of expensive calls

function memoize(fn) {
  // The cache lives in closure — shared across all calls to memoized function
  const cache = new Map();

  return function (...args) {
    // Create a cache key from all the arguments
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("📦 Cache hit for:", key);
      return cache.get(key); // return stored result, skip computation
    }

    console.log("🔨 Computing for:", key);
    const result = fn.apply(this, args); // call original function
    cache.set(key, result); // save result for next time
    return result;
  };
}

// Simulate an expensive calculation
function slowSquare(n) {
  // imagine this takes 1 second to compute
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // 🔨 Computing... → 25
console.log(fastSquare(5)); // 📦 Cache hit!   → 25 (instant!)
console.log(fastSquare(10)); // 🔨 Computing... → 100
console.log(fastSquare(10)); // 📦 Cache hit!   → 100 (instant!)
```

---

### Q29 — Module pattern — private state with closure

```javascript
// QUESTION: Create a bank account with private balance

const BankAccount = (function () {
  // Private — can't be accessed from outside
  let balance = 0;
  const transactions = [];

  // Public API — these functions close over balance and transactions
  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Amount must be positive");
      balance += amount;
      transactions.push({ type: "deposit", amount });
      console.log(`Deposited $${amount}. Balance: $${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactions.push({ type: "withdraw", amount });
      console.log(`Withdrew $${amount}. Balance: $${balance}`);
    },
    getBalance() {
      return balance; // read only — can't SET balance from outside
    },
    getHistory() {
      return [...transactions]; // return a copy, not the real array
    },
  };
})(); // IIFE — runs immediately and returns the public API

BankAccount.deposit(100); // Deposited $100. Balance: $100
BankAccount.withdraw(30); // Withdrew $30. Balance: $70
console.log(BankAccount.getBalance()); // 70
console.log(BankAccount.balance); // undefined — truly private!
```

---

### Q30 — Closure memory: each call gets its OWN closed-over variables

```javascript
// QUESTION: What do multiplier3(5) and multiplier5(3) print?

function makeMultiplier(factor) {
  // Each call to makeMultiplier creates its OWN copy of 'factor'
  return function (number) {
    return number * factor; // remembers the specific factor it was created with
  };
}

const multiplier3 = makeMultiplier(3); // factor = 3 is "locked in"
const multiplier5 = makeMultiplier(5); // factor = 5 is "locked in" (separate!)

console.log(multiplier3(5)); // 5 * 3 = 15
console.log(multiplier5(3)); // 3 * 5 = 15
console.log(multiplier3(2)); // 2 * 3 = 6

// Both closures exist INDEPENDENTLY — changing one doesn't affect the other
// This is the "function factory" pattern — very common in React (e.g. event handlers)
```

---

### Q31 — Partial application with closures

```javascript
// QUESTION: Implement a function that pre-fills some arguments of another function

function partial(fn, ...presetArgs) {
  // presetArgs are "baked in" via closure
  return function (...laterArgs) {
    // Combine preset args with later args, then call original
    return fn(...presetArgs, ...laterArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

// Pre-fill the first argument as 10
const addFrom10 = partial(add, 10);
console.log(addFrom10(5, 3)); // 10 + 5 + 3 = 18
console.log(addFrom10(1, 1)); // 10 + 1 + 1 = 12

// Pre-fill multiple arguments
const add10and5 = partial(add, 10, 5);
console.log(add10and5(3)); // 10 + 5 + 3 = 18

// Real-world use case: pre-configure a function with base settings
const logWithPrefix = partial(console.log, "[INFO]");
logWithPrefix("Server started"); // "[INFO] Server started"
logWithPrefix("Port 3000"); // "[INFO] Port 3000"
```

---

### Q32 — Implement curry

```javascript
// QUESTION: Write a curry function that converts f(a,b,c) to f(a)(b)(c)

function curry(fn) {
  // We need to know how many arguments fn expects
  return function curried(...args) {
    if (args.length >= fn.length) {
      // We have enough args — call the original function
      return fn.apply(this, args);
    }
    // Not enough args yet — return a function to collect more
    return function (...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24 — one at a time
console.log(curriedMultiply(2, 3)(4)); // 24 — two then one
console.log(curriedMultiply(2)(3, 4)); // 24 — one then two
console.log(curriedMultiply(2, 3, 4)); // 24 — all at once

// Real-world: curry is super useful for building specialized functions
const double = curriedMultiply(2);
const triple = curriedMultiply(3);
console.log(double(5)(1)); // 2 * 5 * 1 = 10
```

---

### Q33 — `once()` — a function that only runs one time

```javascript
// QUESTION: Write a function that wraps another function so it only executes once

function once(fn) {
  let hasRun = false; // tracks whether fn was already called
  let result; // stores the result of the first call

  return function (...args) {
    if (!hasRun) {
      result = fn.apply(this, args); // run only the first time
      hasRun = true; // flip the flag
    }
    return result; // always return the first result
  };
}

function initializeApp() {
  console.log("App initialized!");
  return { status: "ready" };
}

const safeInit = once(initializeApp);
console.log(safeInit()); // "App initialized!" → { status: "ready" }
console.log(safeInit()); // nothing logged    → { status: "ready" } (cached)
console.log(safeInit()); // nothing logged    → { status: "ready" } (cached)
```

---

### Q34 — Function composition

```javascript
// QUESTION: Write compose() and pipe() that chain functions together

// compose: applies functions RIGHT to LEFT (mathematical order)
function compose(...fns) {
  return function (value) {
    // reduceRight starts from the LAST function and works backward
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

// pipe: applies functions LEFT to RIGHT (reading order, more intuitive)
function pipe(...fns) {
  return function (value) {
    // reduce starts from the FIRST function and works forward
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// compose: square THEN addOne THEN double (right to left)
const transform1 = compose(double, addOne, square);
console.log(transform1(3)); // square(3)=9 → addOne(9)=10 → double(10)=20

// pipe: double THEN addOne THEN square (left to right — easier to read)
const transform2 = pipe(double, addOne, square);
console.log(transform2(3)); // double(3)=6 → addOne(6)=7 → square(7)=49
```

---

### Q35 — Closure trap: closures share a binding, not a value

```javascript
// QUESTION: What does this print? Why? How do you fix it?

const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(function () {
    return i; // closes over the SAME i
  });
}

// Loop is done, i = 3
console.log(funcs[0]()); // 3 — not 0!
console.log(funcs[1]()); // 3 — not 1!
console.log(funcs[2]()); // 3 — not 2!

// FIX: let creates a fresh binding per iteration
const fixedFuncs = [];
for (let j = 0; j < 3; j++) {
  fixedFuncs.push(function () {
    return j; // each iteration has its OWN j
  });
}

console.log(fixedFuncs[0]()); // 0 ✓
console.log(fixedFuncs[1]()); // 1 ✓
console.log(fixedFuncs[2]()); // 2 ✓
```

---

### Q36 — Implement `debounce`

```javascript
// QUESTION: Write a debounce function.
// Debounce: delay execution and reset the timer if called again before it fires.
// Use case: search input — only call API after the user STOPS typing

function debounce(fn, delay) {
  let timeoutId; // starts as undefined

  return function (...args) {
    // Clear any existing timer — restart the countdown
    clearTimeout(timeoutId);

    // Start a fresh timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args); // call with correct context and all args
    }, delay);
  };
}

// Example usage
function searchAPI(query) {
  console.log(`🔍 Calling API with: "${query}"`);
}

const debouncedSearch = debounce(searchAPI, 300);

// Simulate rapid typing — only the LAST call fires after 300ms of silence
debouncedSearch("r");
debouncedSearch("re");
debouncedSearch("rea");
debouncedSearch("reac");
debouncedSearch("react"); // ← only this one actually fires
// Output after 300ms: 🔍 Calling API with: "react"
```

---

### Q37 — Implement `throttle`

```javascript
// QUESTION: Write a throttle function.
// Throttle: allow execution at most ONCE per time period, no matter how many calls come in.
// Use case: scroll handler — fire at most every 100ms even if scroll fires constantly

function throttle(fn, interval) {
  let lastRunTime = 0; // timestamp of last actual execution

  return function (...args) {
    const now = Date.now();

    // Check how much time has passed since last run
    if (now - lastRunTime >= interval) {
      lastRunTime = now; // update timestamp
      fn.apply(this, args); // execute the function
    }
    // If interval hasn't passed, this call is silently ignored
  };
}

function onScroll(event) {
  console.log("📜 Scroll handler at:", Date.now());
}

const throttledScroll = throttle(onScroll, 200);

// Even if the browser fires scroll 100 times per second,
// our handler only runs at most once every 200ms
window.addEventListener("scroll", throttledScroll);
```

---

### Q38 — Closures and asynchronous loops (interview trap)

```javascript
// QUESTION: What prints? How would you fix it?

const tasks = ["task A", "task B", "task C"];

for (var i = 0; i < tasks.length; i++) {
  setTimeout(function () {
    // i is 3 when this runs — the loop already finished
    console.log(`Running ${tasks[i]}`); // tasks[3] is undefined!
  }, i * 1000);
}

// OUTPUT (over 3 seconds):
// Running undefined
// Running undefined
// Running undefined

// FIX: use let to capture the correct index per iteration
for (let i = 0; i < tasks.length; i++) {
  setTimeout(function () {
    console.log(`Running ${tasks[i]}`); // correct!
  }, i * 1000);
}

// OUTPUT:
// Running task A
// Running task B
// Running task C
```

---

### Q39 — Immediately Invoked Function Expression (IIFE)

```javascript
// IIFE: a function that defines and calls itself immediately
// Used to create a private scope that doesn't pollute global variables

const result = (function () {
  const privateVar = "I'm private!"; // can't be accessed outside
  return {
    getPrivate() {
      return privateVar;
    },
    greet(name) {
      return `Hello, ${name}!`;
    },
  };
})(); // ← the () at the end calls the function immediately

console.log(result.getPrivate()); // "I'm private!"
console.log(result.greet("Alice")); // "Hello, Alice!"
// console.log(privateVar); ← ReferenceError — truly private!

// Arrow function IIFE syntax
const value = (() => {
  return 42;
})();

console.log(value); // 42
```

---

### Q40 — Stale closure gotcha in React (very common in real interviews)

```javascript
// QUESTION: This is a pattern that comes up constantly in React interviews
// Why does this counter sometimes log the wrong value?

function setupCounter() {
  let count = 0;

  function increment() {
    count += 1;
  }

  function logAfterDelay() {
    // Captures the CURRENT count at the time this is called
    const captured = count;
    setTimeout(() => {
      // 1 second later — 'captured' is the value from when logAfterDelay was called
      console.log("Expected:", captured);
      console.log("Current:", count); // count may have changed!
    }, 1000);
  }

  return { increment, logAfterDelay };
}

const counter = setupCounter();
counter.increment(); // count = 1
counter.increment(); // count = 2
counter.logAfterDelay(); // captures count = 2
counter.increment(); // count = 3 — happens BEFORE timeout fires
counter.increment(); // count = 4

// After 1 second:
// Expected: 2    ← the snapshot when logAfterDelay() was called
// Current:  4    ← the actual current value
```

---

## Part 3 — Async, Promises & Event Loop (Q41–55)

---

### Q41 — Convert callback to Promise

```javascript
// QUESTION: Convert this old-style callback function to return a Promise

// OLD: callback-based (legacy Node style)
function readFileCallback(path, callback) {
  // Pretend this reads a file asynchronously
  setTimeout(() => {
    if (path) {
      callback(null, `Content of ${path}`); // success: null error, data
    } else {
      callback(new Error("Path is required"), null); // failure: error, null data
    }
  }, 100);
}

// NEW: Promise-based version
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    readFileCallback(path, (error, data) => {
      if (error) {
        reject(error); // failure → reject
      } else {
        resolve(data); // success → resolve
      }
    });
  });
}

// Usage with async/await
async function main() {
  try {
    const content = await readFilePromise("./data.txt");
    console.log(content); // "Content of ./data.txt"

    await readFilePromise(null); // will throw
  } catch (err) {
    console.error("Error:", err.message); // "Path is required"
  }
}

main();
```

---

### Q42 — Sequential vs parallel async calls

```javascript
// QUESTION: What's the difference in timing between these two approaches?

async function fetchUser(id) {
  // Simulate network call
  return new Promise((resolve) => setTimeout(() => resolve({ id, name: `User ${id}` }), 500));
}

// SEQUENTIAL: each waits for the previous to finish — SLOW
async function getSequential() {
  console.time("sequential");
  const user1 = await fetchUser(1); // waits 500ms
  const user2 = await fetchUser(2); // waits another 500ms
  const user3 = await fetchUser(3); // waits another 500ms
  console.timeEnd("sequential"); // ~1500ms total
  return [user1, user2, user3];
}

// PARALLEL: all fire at the same time — FAST
async function getParallel() {
  console.time("parallel");
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1), // all three start simultaneously
    fetchUser(2),
    fetchUser(3),
  ]);
  console.timeEnd("parallel"); // ~500ms total (limited by slowest)
  return [user1, user2, user3];
}

// When to use sequential:
// - When each request depends on the previous result
// - When order of operations matters (e.g. create account, then log in)

// When to use parallel:
// - When requests are independent of each other — almost always prefer this!
```

---

### Q43 — `Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any`

```javascript
const p1 = Promise.resolve("✅ Success 1");
const p2 = Promise.reject(new Error("❌ Failed!"));
const p3 = Promise.resolve("✅ Success 3");

// Promise.all — ALL must succeed, ONE failure = total failure
Promise.all([p1, p2, p3]).catch((err) => console.log("all:", err.message));
// → "all: ❌ Failed!" — immediately rejects on first failure

// Promise.allSettled — waits for ALL, reports each outcome
Promise.allSettled([p1, p2, p3]).then((results) => {
  results.forEach((r) => {
    if (r.status === "fulfilled") console.log("✅", r.value);
    if (r.status === "rejected") console.log("❌", r.reason.message);
  });
});
// → ✅ "Success 1", ❌ "Failed!", ✅ "Success 3"

// Promise.race — first one to settle (resolve OR reject) wins
const fast = new Promise((r) => setTimeout(() => r("fast!"), 100));
const slow = new Promise((r) => setTimeout(() => r("slow!"), 500));
Promise.race([fast, slow]).then((val) => console.log("race:", val));
// → "race: fast!" — slow is ignored once fast resolves

// Promise.any — first to RESOLVE (ignores rejections until all fail)
Promise.any([p2, p3]).then((val) => console.log("any:", val));
// → "any: ✅ Success 3" — p2 failed but p3 succeeded, so p3 wins
```

---

### Q44 — Async error handling patterns

```javascript
// QUESTION: Show different ways to handle errors in async code

// PATTERN 1: try/catch with async/await (most readable)
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error.message);
    return null; // return safe fallback instead of crashing
  }
}

// PATTERN 2: .catch() on the Promise chain
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Error:", err)); // catches ANY error above

// PATTERN 3: Helper to avoid try/catch repetition (common in TypeScript)
async function safeAwait(promise) {
  try {
    const result = await promise;
    return [null, result]; // [error, data]
  } catch (error) {
    return [error, null];
  }
}

// Usage:
async function main() {
  const [err, data] = await safeAwait(fetchData("https://api.example.com/users"));
  if (err) {
    console.log("Something went wrong:", err.message);
    return;
  }
  console.log("Got data:", data);
}
```

---

### Q45 — What does `async` function always return?

```javascript
// An async function ALWAYS returns a Promise — no exceptions

async function returnsValue() {
  return 42; // wraps 42 in a resolved Promise
}

async function returnsUndefined() {
  // no return statement — still returns a Promise that resolves to undefined
}

async function throwsError() {
  throw new Error("Oops!"); // returns a REJECTED Promise
}

// How to consume them:
returnsValue().then((val) => console.log(val)); // 42
returnsUndefined().then((val) => console.log(val)); // undefined
throwsError().catch((err) => console.log(err.message)); // "Oops!"

// Even if you call an async function WITHOUT await, it returns a Promise
const promise = returnsValue();
console.log(promise); // Promise { 42 }
console.log(typeof promise.then); // "function"
```

---

### Q46 — Implement a delay/sleep function

```javascript
// QUESTION: Write a sleep function that pauses execution for N milliseconds

function sleep(ms) {
  // Return a Promise that resolves after ms milliseconds
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage with async/await — reads like synchronous pause
async function main() {
  console.log("Start");
  await sleep(2000); // pauses here for 2 seconds
  console.log("2 seconds later...");
  await sleep(1000); // pauses again for 1 second
  console.log("Done!");
}

main();

// Real-world use: retry logic with delay
async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (attempt === retries) throw err; // last attempt, give up
      console.log(`Attempt ${attempt} failed. Retrying in 1s...`);
      await sleep(1000 * attempt); // exponential backoff: 1s, 2s, 3s
    }
  }
}
```

---

### Q47 — Microtask queue execution order deep dive

```javascript
// QUESTION: What is the exact output order?

console.log("1");

setTimeout(() => console.log("2"), 0); // macrotask

Promise.resolve()
  .then(() => {
    console.log("3");
    Promise.resolve().then(() => console.log("4")); // nested microtask
  })
  .then(() => console.log("5"));

console.log("6");

// OUTPUT:
// 1 ← sync
// 6 ← sync
// 3 ← first microtask
// 4 ← microtask queued DURING "3" runs before "5"!
// 5 ← second .then of the outer chain
// 2 ← macrotask runs last

// WHY?
// Microtask queue is FULLY drained before moving on.
// When "3" runs, it queues "4". The engine processes "4" IMMEDIATELY
// (still draining microtasks) before picking up "5".
```

---

### Q48 — Promise chaining and return values

```javascript
// QUESTION: What does each .then receive?

Promise.resolve(5)
  .then((val) => {
    console.log("A:", val); // receives 5 from Promise.resolve(5)
    return val * 2; // returns 10 to next .then
  })
  .then((val) => {
    console.log("B:", val); // receives 10
    // no return → next .then gets undefined
  })
  .then((val) => {
    console.log("C:", val); // undefined
    return Promise.resolve("wrapped"); // can return another Promise!
  })
  .then((val) => {
    console.log("D:", val); // "wrapped" — unwrapped automatically by .then
  });

// OUTPUT:
// A: 5
// B: 10
// C: undefined
// D: "wrapped"
```

---

### Q49 — `async`/`await` with `for...of` loops

```javascript
// QUESTION: Process an array of promises one at a time in sequence

const userIds = [1, 2, 3, 4, 5];

async function getUser(id) {
  await sleep(200); // simulate API delay
  return { id, name: `User ${id}` };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ❌ WRONG: forEach doesn't wait for async callbacks
async function wrongWay() {
  userIds.forEach(async (id) => {
    const user = await getUser(id); // these don't actually run in sequence
    console.log(user);
  });
}

// ✅ CORRECT: for...of respects await
async function rightWay() {
  for (const id of userIds) {
    const user = await getUser(id); // waits for each one before next
    console.log(user);
  }
}

// ✅ ALSO CORRECT and FASTER: all at once with Promise.all
async function fastWay() {
  const users = await Promise.all(userIds.map((id) => getUser(id)));
  console.log(users); // all results together
}
```

---

### Q50 — Implement a Promise from scratch (conceptual)

```javascript
// QUESTION: Build a simplified Promise class to show you understand how it works

class SimplePromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.callbacks = []; // stores { onFulfilled, onRejected } pairs

    const resolve = (value) => {
      if (this.state !== "pending") return; // can only settle once
      this.state = "fulfilled";
      this.value = value;
      // notify all registered .then callbacks
      this.callbacks.forEach((cb) => cb.onFulfilled && cb.onFulfilled(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = reason;
      this.callbacks.forEach((cb) => cb.onRejected && cb.onRejected(reason));
    };

    try {
      executor(resolve, reject); // run the user-provided function
    } catch (err) {
      reject(err); // if executor throws, reject the promise
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled" && onFulfilled) {
      onFulfilled(this.value); // already settled, run immediately
    } else if (this.state === "rejected" && onRejected) {
      onRejected(this.value);
    } else {
      this.callbacks.push({ onFulfilled, onRejected }); // store for later
    }
    return this; // allow chaining (simplified)
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Test it
new SimplePromise((resolve) => {
  setTimeout(() => resolve("hello!"), 100);
}).then((val) => console.log("Resolved:", val)); // "Resolved: hello!"
```

---

### Q51 — Event emitter implementation

```javascript
// QUESTION: Build a simple EventEmitter (like Node's EventEmitter, or a JS pub/sub)

class EventEmitter {
  constructor() {
    // Map of event name → array of listener functions
    this.events = {};
  }

  // Register a listener for an event
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []; // create array for this event if first listener
    }
    this.events[event].push(listener);
    return this; // allow chaining: emitter.on("x", fn1).on("x", fn2)
  }

  // Emit an event — call all listeners with given args
  emit(event, ...args) {
    if (!this.events[event]) return false; // no listeners for this event
    this.events[event].forEach((listener) => listener(...args));
    return true;
  }

  // Remove a specific listener
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // Listen only ONCE — auto-removes itself after first call
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // remove after first fire
    };
    this.on(event, wrapper);
  }
}

// Usage
const emitter = new EventEmitter();

function handleLogin(user) {
  console.log(`👋 ${user.name} logged in`);
}

emitter.on("login", handleLogin);
emitter.once("firstVisit", () => console.log("🎉 Welcome, first-time visitor!"));

emitter.emit("login", { name: "Alice" }); // "👋 Alice logged in"
emitter.emit("firstVisit"); // "🎉 Welcome, first-time visitor!"
emitter.emit("firstVisit"); // nothing — once() removed it
emitter.off("login", handleLogin);
emitter.emit("login", { name: "Bob" }); // nothing — listener removed
```

---

### Q52 — Promise timeout pattern

```javascript
// QUESTION: Write a function that races a fetch against a timeout

function withTimeout(promise, ms) {
  // Create a promise that rejects after 'ms' milliseconds
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms),
  );

  // Race the original promise against the timeout
  // Whichever settles first "wins"
  return Promise.race([promise, timeout]);
}

async function fetchUser(id) {
  // Simulate a slow API
  await sleep(3000); // takes 3 seconds
  return { id, name: "Alice" };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Will timeout after 1 second because fetchUser takes 3 seconds
async function main() {
  try {
    const user = await withTimeout(fetchUser(1), 1000);
    console.log("Got user:", user);
  } catch (err) {
    console.log("Error:", err.message); // "Timed out after 1000ms"
  }
}

main();
```

---

### Q53 — Concurrent promise pool (limit parallel requests)

```javascript
// QUESTION: Run promises with a concurrency limit (e.g., max 3 at a time)
// Real-world: scraping 100 URLs but not overwhelming a server

async function promisePool(tasks, limit) {
  const results = [];
  const executing = new Set(); // track currently running promises

  for (const task of tasks) {
    // Create the promise and add to tracking set
    const promise = task().then((result) => {
      executing.delete(promise); // remove when done
      return result;
    });

    results.push(promise);
    executing.add(promise);

    // If we've hit the limit, wait for ONE to finish before adding more
    if (executing.size >= limit) {
      await Promise.race(executing); // wait for whichever finishes first
    }
  }

  return Promise.all(results); // wait for all remaining
}

// Test: simulate 8 tasks, max 3 running at once
const tasks = Array.from(
  { length: 8 },
  (_, i) => () =>
    new Promise((resolve) => {
      console.log(`Task ${i + 1} started`);
      setTimeout(() => {
        console.log(`Task ${i + 1} done`);
        resolve(i + 1);
      }, Math.random() * 1000);
    }),
);

promisePool(tasks, 3).then((results) => {
  console.log("All done! Results:", results);
});
```

---

### Q54 — `finally` behavior in promise chains

```javascript
// QUESTION: When does .finally() run and what does it return?

// finally ALWAYS runs — whether resolved or rejected
Promise.resolve("success")
  .then((val) => {
    console.log("then:", val);
    return val; // passes through
  })
  .finally(() => {
    console.log("finally 1 — always runs");
    // return value from finally is IGNORED (unless it throws)
    return "this is ignored";
  })
  .then((val) => console.log("after finally:", val)); // still "success"!

// OUTPUT:
// then: success
// finally 1 — always runs
// after finally: success  ← original value passed through!

// With rejection:
Promise.reject(new Error("oops"))
  .catch((err) => {
    console.log("caught:", err.message);
    // if we don't rethrow, it becomes resolved after catch
  })
  .finally(() => console.log("finally 2")); // still runs!

// Use case: cleanup that must happen regardless (close DB connection, hide loading spinner)
```

---

### Q55 — Implement retry with exponential backoff

```javascript
// QUESTION: Retry a failing async operation with increasing delays

async function retry(fn, { retries = 3, delay = 1000, factor = 2 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(); // try the operation
    } catch (error) {
      if (attempt === retries) {
        // Last attempt failed — give up and throw the error
        throw new Error(`All ${retries + 1} attempts failed: ${error.message}`);
      }

      const waitTime = delay * Math.pow(factor, attempt); // 1s, 2s, 4s, 8s...
      console.log(`Attempt ${attempt + 1} failed. Retrying in ${waitTime}ms...`);
      await new Promise((r) => setTimeout(r, waitTime));
    }
  }
}

// Example usage
let callCount = 0;
async function unstableAPI() {
  callCount++;
  if (callCount < 3) throw new Error("Service unavailable");
  return { data: "success!" };
}

retry(unstableAPI, { retries: 4, delay: 500, factor: 2 })
  .then((result) => console.log("✅ Got result:", result))
  .catch((err) => console.log("❌ Final error:", err.message));
```

---

## Part 4 — Arrays & Objects Manipulation (Q56–70)

---

### Q56 — Flatten a deeply nested array

```javascript
// QUESTION: Write a function to flatten an array to any depth

// Method 1: Built-in (simplest)
const nested = [1, [2, [3, [4, [5]]]]];
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]

// Method 2: Recursive implementation (what the interview wants to see)
function flatten(arr, depth = Infinity) {
  return arr.reduce((flat, item) => {
    if (Array.isArray(item) && depth > 0) {
      // If item is an array and we have remaining depth, flatten it
      return [...flat, ...flatten(item, depth - 1)];
    }
    return [...flat, item]; // otherwise just add the item
  }, []);
}

console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4]]]], 1)); // [1, 2, [3, [4]]] — only 1 level deep
console.log(flatten([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]] — 2 levels deep

// Method 3: Stack-based (no recursion, avoids call stack overflow on huge arrays)
function flattenStack(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop(); // take from end
    if (Array.isArray(item)) {
      stack.push(...item); // push its contents back onto stack
    } else {
      result.unshift(item); // add to beginning to preserve order
    }
  }
  return result;
}
```

---

### Q57 — Group an array of objects by a key

```javascript
// QUESTION: Group an array of items by a specific property

function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = item[key]; // get the value we're grouping by

    // If this group doesn't exist yet, create it as an empty array
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(item); // add item to its group
    return groups;
  }, {});
}

const people = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Design" },
  { name: "Carol", department: "Engineering" },
  { name: "Dave", department: "Design" },
  { name: "Eve", department: "Marketing" },
];

const byDepartment = groupBy(people, "department");

console.log(byDepartment);
// {
//   Engineering: [{ name: "Alice", ... }, { name: "Carol", ... }],
//   Design:      [{ name: "Bob", ... }, { name: "Dave", ... }],
//   Marketing:   [{ name: "Eve", ... }]
// }

// Modern JS approach using Object.groupBy (ES2024 — check browser support!)
// const grouped = Object.groupBy(people, p => p.department);
```

---

### Q58 — Remove duplicates from an array

```javascript
// QUESTION: Remove duplicates. Show multiple approaches.

const nums = [1, 2, 2, 3, 4, 4, 4, 5];

// Method 1: Set (simplest, works for primitives)
const unique1 = [...new Set(nums)];
console.log(unique1); // [1, 2, 3, 4, 5]

// Method 2: filter + indexOf
const unique2 = nums.filter(
  (item, index) => nums.indexOf(item) === index, // only keep item if this IS its first occurrence
);
console.log(unique2); // [1, 2, 3, 4, 5]

// Method 3: reduce
const unique3 = nums.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);

// For OBJECTS — need custom comparison (Set won't work since {} !== {})
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" }, // duplicate by id
];

function uniqueById(arr, key) {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item[key])) return false; // already seen this id
    seen.add(item[key]); // mark as seen
    return true;
  });
}

console.log(uniqueById(users, "id"));
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

---

### Q59 — Deep clone an object

```javascript
// QUESTION: Deep clone an object without using external libraries

// Method 1: structuredClone — modern, built-in (Node 17+, modern browsers)
const original = { a: 1, nested: { b: [1, 2, 3] }, date: new Date() };
const clone1 = structuredClone(original);
clone1.nested.b.push(4);
console.log(original.nested.b); // [1, 2, 3] — unaffected!
console.log(clone1.nested.b); // [1, 2, 3, 4]

// Method 2: JSON.parse(JSON.stringify()) — quick but lossy
// ❌ Loses: functions, undefined, Symbol, Date becomes string, no circular refs
const clone2 = JSON.parse(JSON.stringify({ a: 1, nested: { b: [1, 2, 3] } }));

// Method 3: Recursive implementation (interview favorite)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj; // primitive
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));

  // Plain object: clone each property recursively
  const cloned = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

---

### Q60 — Find the missing number in an array 1–N

```javascript
// QUESTION: An array of N-1 integers contains numbers 1 to N with one missing. Find it.

function findMissing(arr) {
  const n = arr.length + 1; // array has N-1 items, so N = arr.length + 1

  // The sum of 1 to N is n*(n+1)/2
  // The missing number = expected sum - actual sum
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}

console.log(findMissing([1, 2, 4, 5, 6])); // 3 — missing 3
console.log(findMissing([2, 3, 4, 5])); // 1 — missing 1
console.log(findMissing([1, 2, 3, 4])); // 5 — missing 5

// Alternative: XOR approach (avoids potential integer overflow for huge N)
function findMissingXOR(arr) {
  let result = arr.length + 1; // start with N
  for (let i = 0; i < arr.length; i++) {
    result ^= (i + 1) ^ arr[i]; // XOR with index+1 and actual value
  }
  return result; // XOR cancels out all pairs except the missing number
}
```

---

### Q61 — Chunk an array into groups of N

```javascript
// QUESTION: Split an array into chunks of size N

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    // slice from current position to current + size
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
// [[1, 2, 3], [4, 5, 6], [7]] — last group can be smaller

console.log(chunk([1, 2, 3, 4], 2));
// [[1, 2], [3, 4]]

// Using reduce
function chunkReduce(arr, size) {
  return arr.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / size); // which chunk does this item belong to?
    if (!result[chunkIndex]) result[chunkIndex] = [];
    result[chunkIndex].push(item);
    return result;
  }, []);
}
```

---

### Q62 — Deep equality check between two objects

```javascript
// QUESTION: Check if two objects are deeply equal (all nested values match)

function deepEqual(a, b) {
  // Same reference = definitely equal
  if (a === b) return true;

  // One null, one not = not equal
  if (a === null || b === null) return false;

  // Different types = not equal
  if (typeof a !== typeof b) return false;

  // Primitives: already handled by === above (or types differ)
  if (typeof a !== "object") return a === b;

  // Arrays: check lengths and compare element by element
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }

  // Objects: check same keys and recursively compare values
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}

console.log(deepEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } })); // true
console.log(deepEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 4 } })); // false
console.log(deepEqual([1, [2, 3]], [1, [2, 3]])); // true
console.log(deepEqual([1, 2], [1, 2, 3])); // false
```

---

### Q63 — Rotate an array

```javascript
// QUESTION: Rotate an array K steps to the right

// Example: [1,2,3,4,5] rotated 2 → [4,5,1,2,3]

function rotate(arr, k) {
  const n = arr.length;
  k = k % n; // handle k larger than array length (e.g., rotate 7 on length 5)

  // Slice and rearrange: take last k items and put them first
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}

console.log(rotate([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
console.log(rotate([1, 2, 3], 1)); // [3, 1, 2]
console.log(rotate([1, 2, 3], 6)); // [1, 2, 3] — 6 % 3 = 0, no change

// In-place rotation (no extra space)
function rotateInPlace(arr, k) {
  k = k % arr.length;
  // Reverse the whole array, then reverse each part
  reverse(arr, 0, arr.length - 1); // [5,4,3,2,1]
  reverse(arr, 0, k - 1); // [4,5,3,2,1]
  reverse(arr, k, arr.length - 1); // [4,5,1,2,3]
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++;
    right--;
  }
}
```

---

### Q64 — Two Sum problem

```javascript
// QUESTION: Given an array of numbers and a target, return indices of two numbers that add to target

// Brute force: O(n²) — check every pair
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]; // found it!
      }
    }
  }
  return []; // no solution
}

// Optimized: O(n) — use a Map to store complements
function twoSum(nums, target) {
  const seen = new Map(); // Map of value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // what do we NEED to pair with nums[i]?

    if (seen.has(complement)) {
      // We've seen the complement before — found our pair!
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i); // store this number and its index for future lookups
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1] → 2+7=9
console.log(twoSum([3, 2, 4], 6)); // [1, 2] → 2+4=6
console.log(twoSum([3, 3], 6)); // [0, 1] → 3+3=6
```

---

### Q65 — Flatten object keys into dot notation

```javascript
// QUESTION: Convert a nested object into a flat object with dot-notation keys

function flattenObject(obj, prefix = "") {
  return Object.keys(obj).reduce((flat, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key; // build "parent.child" key

    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      // Nested object — recurse and merge results
      Object.assign(flat, flattenObject(obj[key], fullKey));
    } else {
      flat[fullKey] = obj[key]; // primitive or array — add directly
    }
    return flat;
  }, {});
}

const nested = {
  user: {
    name: "Alice",
    address: {
      city: "New York",
      zip: "10001",
    },
  },
  score: 42,
};

console.log(flattenObject(nested));
// {
//   "user.name": "Alice",
//   "user.address.city": "New York",
//   "user.address.zip": "10001",
//   "score": 42
// }
```

---

### Q66 — Maximum subarray sum (Kadane's algorithm)

```javascript
// QUESTION: Find the maximum sum of a contiguous subarray

function maxSubarraySum(nums) {
  // Start with the first element as both current sum and max sum
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the current subarray OR start fresh from this element
    // whichever is larger
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// 6 → the subarray [4, -1, 2, 1] has the maximum sum

console.log(maxSubarraySum([-1, -2, -3])); // -1 → all negative, best is least negative
console.log(maxSubarraySum([1, 2, 3, 4])); // 10 → take all of them
```

---

### Q67 — Count occurrences of each element

```javascript
// QUESTION: Count how many times each value appears in an array

function countOccurrences(arr) {
  return arr.reduce((counts, item) => {
    counts[item] = (counts[item] || 0) + 1; // increment or start at 1
    return counts;
  }, {});
}

const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
console.log(countOccurrences(fruits));
// { apple: 3, banana: 2, cherry: 1 }

// Find the most common element
function mostCommon(arr) {
  const counts = countOccurrences(arr);
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]; // sort by count descending // get the key (element) of the first entry
}

console.log(mostCommon(["a", "b", "a", "c", "a", "b"])); // "a"
```

---

### Q68 — Intersection and difference of arrays

```javascript
// QUESTION: Find elements in both arrays (intersection) and only in one (difference)

const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7];

// Intersection: elements in BOTH a and b
function intersection(a, b) {
  const setB = new Set(b); // use Set for O(1) lookups
  return a.filter((item) => setB.has(item));
}
console.log(intersection(a, b)); // [3, 4, 5]

// Difference: elements in a but NOT in b
function difference(a, b) {
  const setB = new Set(b);
  return a.filter((item) => !setB.has(item));
}
console.log(difference(a, b)); // [1, 2]
console.log(difference(b, a)); // [6, 7]

// Symmetric difference: elements in either but NOT both
function symmetricDifference(a, b) {
  return [...difference(a, b), ...difference(b, a)];
}
console.log(symmetricDifference(a, b)); // [1, 2, 6, 7]
```

---

### Q69 — Sort objects array by multiple criteria

```javascript
// QUESTION: Sort an array of objects by multiple properties (primary + secondary sort)

const employees = [
  { name: "Alice", department: "Engineering", salary: 90000 },
  { name: "Bob", department: "Design", salary: 75000 },
  { name: "Carol", department: "Engineering", salary: 85000 },
  { name: "Dave", department: "Design", salary: 80000 },
  { name: "Eve", department: "Engineering", salary: 90000 },
];

// Sort by: department (asc), then salary (desc), then name (asc)
const sorted = [...employees].sort((a, b) => {
  // Primary sort: department alphabetically
  if (a.department !== b.department) {
    return a.department.localeCompare(b.department);
  }
  // Secondary sort: salary descending (higher salary first)
  if (b.salary !== a.salary) {
    return b.salary - a.salary;
  }
  // Tertiary sort: name alphabetically
  return a.name.localeCompare(b.name);
});

console.log(sorted.map((e) => `${e.name} (${e.department}, $${e.salary})`));
// Carol (Engineering, $90000)  ← wait, Alice has same salary
// Alice (Engineering, $90000)  ← A before E alphabetically
// Actually: Design dept comes before Engineering
// Bob (Design, $75000) ... hmm Dave has more
// Let me fix: Dave (Design, $80000), Bob (Design, $75000),
//             Alice (Engineering, $90000), Eve (Engineering, $90000), Carol (Engineering, $85000)
```

---

### Q70 — Zip multiple arrays together

```javascript
// QUESTION: Combine multiple arrays element-by-element (like Python's zip)

function zip(...arrays) {
  // Length of the shortest array determines how many tuples we get
  const minLength = Math.min(...arrays.map((arr) => arr.length));

  return Array.from(
    { length: minLength },
    (_, i) => arrays.map((arr) => arr[i]), // take element i from each array
  );
}

const names = ["Alice", "Bob", "Carol"];
const ages = [30, 25, 35];
const roles = ["Engineer", "Designer", "Manager"];

console.log(zip(names, ages, roles));
// [
//   ["Alice", 30, "Engineer"],
//   ["Bob", 25, "Designer"],
//   ["Carol", 35, "Manager"]
// ]

// Useful: convert to array of objects
const people = zip(names, ages, roles).map(([name, age, role]) => ({
  name,
  age,
  role, // shorthand since key and variable names match
}));
console.log(people);
// [{ name: "Alice", age: 30, role: "Engineer" }, ...]
```

---

## Part 5 — Algorithms & Logic (Q71–85)

---

### Q71 — FizzBuzz (the classic warm-up)

```javascript
// QUESTION: Print numbers 1-100. Multiples of 3: "Fizz", 5: "Buzz", both: "FizzBuzz"

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // Build the output string — if it's empty after checking both, use the number
    let output = "";
    if (i % 3 === 0) output += "Fizz"; // divisible by 3? add Fizz
    if (i % 5 === 0) output += "Buzz"; // divisible by 5? add Buzz
    console.log(output || i); // if output is still "", just print i
  }
}

fizzBuzz(20);
// 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz...

// Alternative: return an array (useful for testing)
const result = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  return n % 15 === 0 ? "FizzBuzz" : n % 3 === 0 ? "Fizz" : n % 5 === 0 ? "Buzz" : String(n);
});
```

---

### Q72 — Fibonacci sequence

```javascript
// QUESTION: Generate the Nth Fibonacci number (multiple approaches)

// APPROACH 1: Recursive (clean but VERY slow — O(2^n))
function fibRecursive(n) {
  if (n <= 1) return n; // base cases: fib(0)=0, fib(1)=1
  return fibRecursive(n - 1) + fibRecursive(n - 2); // recalculates same values!
}

// APPROACH 2: Iterative (fast — O(n) time, O(1) space)
function fibonacci(n) {
  if (n <= 1) return n;
  let prev = 0,
    curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr; // add the two previous numbers
    prev = curr; // shift window forward
    curr = next;
  }
  return curr;
}

// APPROACH 3: Memoized recursion (fast — O(n) time, O(n) space)
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n); // cached — don't recalculate

  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result); // cache before returning
  return result;
}

console.log(fibonacci(10)); // 55
console.log(fibonacci(20)); // 6765

// APPROACH 4: Generator — produce the sequence lazily
function* fibGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const gen = fibGenerator();
const first10 = Array.from({ length: 10 }, () => gen.next().value);
console.log(first10); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

---

### Q73 — Palindrome check

```javascript
// QUESTION: Check if a string is a palindrome (reads same forwards and backwards)

// Simple version: only letters and numbers, case-insensitive
function isPalindrome(str) {
  // Remove non-alphanumeric, lowercase everything
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Compare with reversed version
  const reversed = clean.split("").reverse().join("");

  return clean === reversed;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("hello")); // false

// Two-pointer version (no extra string created — efficient)
function isPalindromePointers(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false; // mismatch found
    left++; // move inward from both sides
    right--;
  }
  return true; // no mismatch found
}
```

---

### Q74 — Anagram check

```javascript
// QUESTION: Check if two strings are anagrams (same letters, different order)

// Method 1: Sort both and compare
function isAnagramSort(a, b) {
  // "listen" → sorted → "eilnst"
  // "silent" → sorted → "eilnst" → equal!
  const normalize = (str) => str.toLowerCase().split("").sort().join("");
  return normalize(a) === normalize(b);
}

// Method 2: Count letter frequencies (more efficient — O(n) vs O(n log n))
function isAnagram(a, b) {
  if (a.length !== b.length) return false; // fast check

  const count = {};

  // Count letters in 'a', increment for each
  for (const char of a.toLowerCase()) {
    count[char] = (count[char] || 0) + 1;
  }

  // Subtract letters in 'b' — if a letter isn't in count or goes negative, not an anagram
  for (const char of b.toLowerCase()) {
    if (!count[char]) return false; // b has a letter a doesn't
    count[char]--;
  }

  return true; // all counts balanced to 0
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("triangle", "integral")); // true
console.log(isAnagram("hello", "world")); // false
```

---

### Q75 — Check balanced parentheses

```javascript
// QUESTION: Check if brackets in a string are properly matched and nested
// Valid: "([]{})", "((()))"    Invalid: "(]", "([)]", "("

function isBalanced(str) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const openers = new Set(["(", "[", "{"]);

  for (const char of str) {
    if (openers.has(char)) {
      stack.push(char); // push opening bracket onto stack
    } else if (pairs[char]) {
      // This is a closing bracket
      if (stack.pop() !== pairs[char]) {
        // The last opened bracket doesn't match this closing bracket
        return false;
      }
    }
    // Ignore all other characters (letters, spaces, etc.)
  }

  return stack.length === 0; // if stack is empty, everything was matched
}

console.log(isBalanced("({[]})")); // true
console.log(isBalanced("(]")); // false
console.log(isBalanced("((()))")); // true
console.log(isBalanced("{[}]")); // false — different types crossed
```

---

### Q76 — Find first non-repeating character

```javascript
// QUESTION: Find the first character that appears exactly once in a string

function firstNonRepeating(str) {
  const count = {};

  // Count each character's frequency
  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }

  // Find the first with count === 1 (preserve original order!)
  for (const char of str) {
    if (count[char] === 1) return char;
  }

  return null; // all characters repeat
}

console.log(firstNonRepeating("aabbc")); // "c" — only non-repeating
console.log(firstNonRepeating("aabbcc")); // null — all repeat
console.log(firstNonRepeating("leetcode")); // "l"
console.log(firstNonRepeating("abcabc")); // null
```

---

### Q77 — Reverse a string multiple ways

```javascript
// QUESTION: Reverse a string — show at least 3 ways

const str = "hello world";

// Method 1: Split, reverse, join (most common answer)
const rev1 = str.split("").reverse().join("");

// Method 2: Spread operator + reverse
const rev2 = [...str].reverse().join("");
// Note: prefer this over split("") for Unicode/emoji support

// Method 3: Reduce (iterating from left, prepending to accumulator)
const rev3 = str.split("").reduce((rev, char) => char + rev, "");

// Method 4: Classic for loop (most control)
function reverseLoop(s) {
  let result = "";
  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i]; // build from the end
  }
  return result;
}

// Method 5: Two pointer in-place (for array/interview purposes)
function reverseInPlace(arr) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // swap
    left++;
    right--;
  }
  return arr;
}

console.log(rev1); // "dlrow olleh"
console.log(rev3); // "dlrow olleh"
```

---

### Q78 — Check if a number is a power of two

```javascript
// QUESTION: Is a given number a power of 2? (1, 2, 4, 8, 16, 32...)

// Method 1: Loop (straightforward)
function isPowerOfTwo(n) {
  if (n <= 0) return false; // negative numbers and 0 are not powers of 2
  while (n > 1) {
    if (n % 2 !== 0) return false; // if it's not divisible by 2, not a power of 2
    n /= 2; // keep dividing by 2
  }
  return true; // divided all the way down to 1
}

// Method 2: Bit manipulation trick (elegant, O(1))
function isPowerOfTwoBit(n) {
  // A power of 2 in binary looks like: 1, 10, 100, 1000...
  // Subtracting 1 flips all lower bits: 01, 011, 0111...
  // So n & (n-1) === 0 ONLY for powers of 2
  return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwoBit(1)); // true  (2^0)
console.log(isPowerOfTwoBit(8)); // true  (2^3)
console.log(isPowerOfTwoBit(16)); // true  (2^4)
console.log(isPowerOfTwoBit(6)); // false
console.log(isPowerOfTwoBit(0)); // false
console.log(isPowerOfTwoBit(-4)); // false
```

---

### Q79 — Binary search

```javascript
// QUESTION: Find a target value in a SORTED array efficiently

// Linear search: O(n) — checks every element
// Binary search: O(log n) — eliminates half the search space each step

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Find the middle index (avoiding integer overflow)
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // found it! return the index
    } else if (arr[mid] < target) {
      left = mid + 1; // target is in the RIGHT half — discard left
    } else {
      right = mid - 1; // target is in the LEFT half — discard right
    }
  }

  return -1; // not found
}

const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(sorted, 7)); // 3 — index 3
console.log(binarySearch(sorted, 13)); // 6 — index 6
console.log(binarySearch(sorted, 4)); // -1 — not in array
```

---

### Q80 — Count vowels and consonants

```javascript
// QUESTION: Count the vowels and consonants in a string

function countVowelsConsonants(str) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let vowelCount = 0;
  let consonantCount = 0;

  for (const char of str.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      // is it a letter?
      if (vowels.has(char)) {
        vowelCount++;
      } else {
        consonantCount++;
      }
    }
    // spaces and punctuation are ignored
  }

  return { vowels: vowelCount, consonants: consonantCount };
}

console.log(countVowelsConsonants("Hello World!"));
// { vowels: 3, consonants: 7 }
```

---

### Q81 — Longest common prefix

```javascript
// QUESTION: Find the longest common prefix of an array of strings

function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  // Start with the first string as our "candidate" prefix
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    // Shrink the prefix until the current string starts with it
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1); // remove last character
      if (!prefix) return ""; // no common prefix at all
    }
  }

  return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // "" — none
console.log(longestCommonPrefix(["interview", "inter", "internet"])); // "inter"
```

---

### Q82 — Calculate factorial

```javascript
// QUESTION: Calculate the factorial of N (N! = N * (N-1) * ... * 1)

// Recursive (elegant but can hit call stack limit for large N)
function factorialRecursive(n) {
  if (n < 0) throw new Error("Factorial not defined for negative numbers");
  if (n === 0 || n === 1) return 1; // base case
  return n * factorialRecursive(n - 1); // 5! = 5 * 4!
}

// Iterative (safer for large N)
function factorial(n) {
  if (n < 0) throw new Error("Factorial not defined for negative numbers");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i; // multiply running total by each number 2..N
  }
  return result;
}

// Using reduce (functional style)
const factorialFn = (n) =>
  n <= 1 ? 1 : Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b);

console.log(factorial(5)); // 120 → 5*4*3*2*1
console.log(factorial(10)); // 3628800
console.log(factorial(0)); // 1 — 0! is defined as 1
```

---

### Q83 — Valid anagram check with a Map

```javascript
// QUESTION: Check if string t is an anagram of string s using a Map

function isAnagramMap(s, t) {
  if (s.length !== t.length) return false;

  const freq = new Map();

  // Count characters in s
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Subtract characters in t
  for (const char of t) {
    if (!freq.has(char) || freq.get(char) === 0) return false;
    freq.set(char, freq.get(char) - 1);
  }

  // All counts should be 0
  return [...freq.values()].every((count) => count === 0);
}

console.log(isAnagramMap("anagram", "nagaram")); // true
console.log(isAnagramMap("rat", "car")); // false
```

---

### Q84 — Implement `Array.prototype.map` from scratch

```javascript
// QUESTION: Show you understand how array methods work by reimplementing map

// This shows interviewers you understand:
// 1. How array methods work under the hood
// 2. The callback signature (element, index, array)
// 3. Prototype extension

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Only process real indexes (skip holes in sparse arrays)
    if (Object.hasOwn(this, i)) {
      // Pass (element, index, originalArray) — same as native map
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

console.log([1, 2, 3].myMap((x) => x * 2)); // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => `${i}:${x}`)); // ["0:1", "1:2", "2:3"]

// Also implement filter
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (Object.hasOwn(this, i) && callback(this[i], i, this)) {
      result.push(this[i]); // only include if callback returns truthy
    }
  }
  return result;
};

console.log([1, 2, 3, 4, 5].myFilter((x) => x % 2 === 0)); // [2, 4]
```

---

### Q85 — Roman numeral conversion

```javascript
// QUESTION: Convert an integer to a Roman numeral (1–3999)

function toRoman(num) {
  // Define value-to-symbol pairs in DESCENDING order
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let result = "";

  for (let i = 0; i < values.length; i++) {
    // Subtract the current value as many times as it fits
    while (num >= values[i]) {
      result += symbols[i]; // append the corresponding symbol
      num -= values[i]; // reduce the number
    }
  }

  return result;
}

console.log(toRoman(3)); // "III"
console.log(toRoman(4)); // "IV"
console.log(toRoman(9)); // "IX"
console.log(toRoman(58)); // "LVIII"
console.log(toRoman(1994)); // "MCMXCIV"
```

---

## Part 6 — Prototypes, Classes & `this` (Q86–92)

---

### Q86 — How does `this` behave in different contexts?

```javascript
// QUESTION: What does 'this' refer to in each case?

// 1. Global context
console.log(this); // In browser: window; In Node: {} (module.exports)

// 2. Regular function — 'this' depends on WHO calls it
function showThis() {
  console.log(this);
}
showThis(); // undefined (strict mode) or global object

// 3. Method call — 'this' is the object before the dot
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice" — 'this' is 'obj'
  },
};
obj.greet(); // "Alice"

// 4. Arrow functions — 'this' comes from ENCLOSING scope (doesn't have its own)
const obj2 = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined — arrow function uses outer 'this' (global)
  },
  greetCorrect() {
    // Arrow INSIDE a method — captures 'this' from greetCorrect's scope
    const arrow = () => console.log(this.name);
    arrow(); // "Bob" — captures the method's 'this'
  },
};
obj2.greet(); // undefined
obj2.greetCorrect(); // "Bob"

// 5. Lost context trap
const greet = obj.greet;
greet(); // undefined! — 'this' is lost when function is detached from obj

// Fix: bind it
const boundGreet = obj.greet.bind(obj);
boundGreet(); // "Alice" — 'this' is permanently bound
```

---

### Q87 — Implement `Function.prototype.bind` from scratch

```javascript
// QUESTION: Write your own bind() — shows deep understanding of 'this'

Function.prototype.myBind = function (context, ...presetArgs) {
  const originalFn = this; // 'this' here is the function bind is called on

  return function (...callArgs) {
    // When the bound function is called, combine preset args with new args
    return originalFn.apply(context, [...presetArgs, ...callArgs]);
  };
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Alice" };

const sayHiToAlice = greet.myBind(user, "Hi"); // preset greeting as "Hi"
console.log(sayHiToAlice("!")); // "Hi, Alice!"
console.log(sayHiToAlice(".")); // "Hi, Alice."
```

---

### Q88 — Implement `Function.prototype.call` and `apply`

```javascript
// QUESTION: Implement your own call() and apply()

Function.prototype.myCall = function (context, ...args) {
  // If no context, use globalThis (or set to an empty object)
  context = context || globalThis;

  // Temporarily add the function as a method on the context object
  // so 'this' inside the function refers to context
  const tempKey = Symbol("temp"); // use Symbol to avoid key collisions
  context[tempKey] = this; // 'this' is the function myCall was called on

  const result = context[tempKey](...args); // call it — 'this' = context!
  delete context[tempKey]; // clean up

  return result;
};

Function.prototype.myApply = function (context, args = []) {
  // Same as myCall but takes array of args instead of spread
  context = context || globalThis;
  const tempKey = Symbol("temp");
  context[tempKey] = this;
  const result = context[tempKey](...args);
  delete context[tempKey];
  return result;
};

function introduce(role, company) {
  return `I'm ${this.name}, ${role} at ${company}`;
}

const person = { name: "Alice" };

console.log(introduce.myCall(person, "Engineer", "Acme"));
// "I'm Alice, Engineer at Acme"

console.log(introduce.myApply(person, ["Designer", "Globex"]));
// "I'm Alice, Designer at Globex"
```

---

### Q89 — How does `new` work? Implement it.

```javascript
// QUESTION: What does 'new' actually do? Recreate it as a function.

// When you do 'new Constructor(args)', JS:
// 1. Creates a new empty object
// 2. Sets the new object's prototype to Constructor.prototype
// 3. Calls Constructor with 'this' = the new object
// 4. Returns the new object (unless Constructor explicitly returns another object)

function myNew(Constructor, ...args) {
  // Step 1 & 2: Create object with correct prototype
  const obj = Object.create(Constructor.prototype);

  // Step 3: Call the constructor with 'this' = our new object
  const result = Constructor.apply(obj, args);

  // Step 4: If constructor returned an object, use that; otherwise use our obj
  return result instanceof Object ? result : obj;
}

// Test
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const alice = myNew(Person, "Alice", 30);
console.log(alice.name); // "Alice"
console.log(alice.age); // 30
console.log(alice.greet()); // "Hi, I'm Alice"
console.log(alice instanceof Person); // true
```

---

### Q90 — Prototype chain output prediction

```javascript
// QUESTION: What does this code output?

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name); // call parent constructor with Dog's 'this'
  this.breed = breed;
}

// Set up prototype chain: Dog → Animal → Object
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // fix constructor reference

Dog.prototype.speak = function () {
  return `${this.name} barks!`; // override Animal's speak
};

const dog = new Dog("Rex", "Lab");

console.log(dog.speak()); // ?
console.log(dog instanceof Dog); // ?
console.log(dog instanceof Animal); // ?
console.log(dog.hasOwnProperty("name")); // ?
console.log(dog.hasOwnProperty("speak")); // ?

// OUTPUT:
// "Rex barks!"       ← Dog.prototype.speak overrides Animal's
// true               ← dog was made by Dog
// true               ← Dog's prototype chain includes Animal
// true               ← 'name' is own property (set in constructor)
// false              ← 'speak' is on the prototype, not the instance
```

---

### Q91 — Class syntax vs prototype — same thing, different face

```javascript
// QUESTION: Rewrite this prototype-based code using class syntax

// Old way (ES5 prototype style)
function VehicleOld(type, speed) {
  this.type = type;
  this.speed = speed;
}
VehicleOld.prototype.describe = function () {
  return `${this.type} goes ${this.speed}km/h`;
};

// New way (ES6 class syntax)
class Vehicle {
  // Constructor sets up instance properties
  constructor(type, speed) {
    this.type = type;
    this.speed = speed;
  }

  // Methods go on the prototype automatically
  describe() {
    return `${this.type} goes ${this.speed}km/h`;
  }

  // Static method — called on the CLASS, not instances
  static compare(v1, v2) {
    return v1.speed > v2.speed ? v1 : v2;
  }
}

class Car extends Vehicle {
  constructor(brand, speed) {
    super("Car", speed); // MUST call super() first in a derived class
    this.brand = brand;
  }

  describe() {
    return `${this.brand}: ${super.describe()}`; // call parent method
  }
}

const car = new Car("Toyota", 120);
console.log(car.describe()); // "Toyota: Car goes 120km/h"

const tesla = new Car("Tesla", 200);
console.log(Vehicle.compare(car, tesla).brand); // "Tesla" (faster)
```

---

### Q92 — Private class fields (modern JS)

```javascript
// QUESTION: How do you create truly private properties in a class?

class BankAccount {
  // Private fields — prefixed with # — truly inaccessible from outside
  #balance = 0;
  #transactionHistory = [];

  constructor(owner, initialDeposit = 0) {
    this.owner = owner; // public property
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
    this.#transactionHistory.push({ type: "deposit", amount, date: new Date() });
    return this; // enable chaining: account.deposit(100).deposit(50)
  }

  get balance() {
    return this.#balance; // getter — read-only from outside
  }

  get history() {
    return [...this.#transactionHistory]; // return copy, not reference
  }
}

const account = new BankAccount("Alice", 500);
account.deposit(200);
console.log(account.balance); // 700
console.log(account.owner); // "Alice"

// console.log(account.#balance); // SyntaxError — truly private!
```

---

## Part 7 — Real-World Utility Functions (Q93–100)

---

### Q93 — Deep get a nested value safely

```javascript
// QUESTION: Write a function to safely get a deeply nested property using a string path

function deepGet(obj, path, defaultValue = undefined) {
  // Split "user.address.city" into ["user", "address", "city"]
  const keys = path.split(".");

  let current = obj;
  for (const key of keys) {
    // If current is null/undefined, return default immediately
    if (current == null) return defaultValue;
    current = current[key]; // move one level deeper
  }

  // Return result, or default if we ended up with undefined
  return current !== undefined ? current : defaultValue;
}

const data = {
  user: {
    profile: {
      name: "Alice",
      address: { city: "NYC" },
    },
    scores: [10, 20, 30],
  },
};

console.log(deepGet(data, "user.profile.name")); // "Alice"
console.log(deepGet(data, "user.profile.address.city")); // "NYC"
console.log(deepGet(data, "user.profile.phone", "N/A")); // "N/A" — missing
console.log(deepGet(data, "user.scores.0")); // 10 — works for arrays too!
console.log(deepGet(null, "user.name", "default")); // "default"
```

---

### Q94 — Implement a simple LRU Cache

```javascript
// QUESTION: Build a Least Recently Used Cache with a fixed capacity
// When full, evicts the least-recently-accessed item

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    // Map preserves INSERTION ORDER — we use this for LRU tracking
    // Most recently used = at the END; Least recently used = at the START
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1; // cache miss

    const value = this.cache.get(key);
    // Move to end = mark as most recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // remove old entry (will re-add at end)
    } else if (this.cache.size >= this.capacity) {
      // Evict the FIRST entry (least recently used)
      const lruKey = this.cache.keys().next().value; // first key in Map
      this.cache.delete(lruKey);
    }

    this.cache.set(key, value); // add/update at end (most recent)
  }
}

const cache = new LRUCache(3); // max 3 items

cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);

console.log(cache.get("a")); // 1 — 'a' is now most recently used
cache.put("d", 4); // capacity full — evicts 'b' (least recent)

console.log(cache.get("b")); // -1 — evicted!
console.log(cache.get("c")); // 3 — still there
console.log(cache.get("a")); // 1 — still there
```

---

### Q95 — Implement a simple Pub/Sub (Observer pattern)

```javascript
// QUESTION: Build a publish-subscribe system (useful for state management understanding)

class PubSub {
  constructor() {
    this.subscribers = {}; // topic → [callback, callback, ...]
  }

  // Subscribe to a topic, get a function back to unsubscribe
  subscribe(topic, callback) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }

    this.subscribers[topic].push(callback);

    // Return an unsubscribe function (closure pattern)
    return () => {
      this.subscribers[topic] = this.subscribers[topic].filter((cb) => cb !== callback);
    };
  }

  // Publish data to all subscribers of a topic
  publish(topic, data) {
    if (!this.subscribers[topic]) return; // no one listening
    this.subscribers[topic].forEach((callback) => callback(data));
  }
}

// Usage
const pubsub = new PubSub();

// Subscribe
const unsubCart = pubsub.subscribe("cart:updated", (cart) => {
  console.log("🛒 Cart component updated:", cart.itemCount, "items");
});

pubsub.subscribe("cart:updated", (cart) => {
  console.log("💰 Price component updated: $" + cart.total);
});

pubsub.publish("cart:updated", { itemCount: 3, total: 49.99 });
// 🛒 Cart component updated: 3 items
// 💰 Price component updated: $49.99

// Unsubscribe cart component
unsubCart();

pubsub.publish("cart:updated", { itemCount: 4, total: 59.99 });
// 💰 Price component updated: $59.99  ← only this one now
```

---

### Q96 — Observable / reactive value

```javascript
// QUESTION: Create a reactive value that notifies subscribers when it changes

function createReactive(initialValue) {
  let value = initialValue;
  const listeners = new Set(); // Set avoids duplicate listeners

  return {
    // Get current value
    get() {
      return value;
    },
    // Set new value — notifies all listeners
    set(newValue) {
      if (newValue === value) return; // no change, no notification
      const oldValue = value;
      value = newValue;
      // Notify all listeners with new and old values
      listeners.forEach((listener) => listener(newValue, oldValue));
    },
    // Subscribe to changes
    subscribe(listener) {
      listeners.add(listener);
      // Return unsubscribe function
      return () => listeners.delete(listener);
    },
  };
}

const count = createReactive(0);

// Subscribe to changes
const unsub = count.subscribe((newVal, oldVal) => {
  console.log(`Count changed: ${oldVal} → ${newVal}`);
});

count.set(1); // "Count changed: 0 → 1"
count.set(5); // "Count changed: 1 → 5"
count.set(5); // no output — value didn't change

unsub(); // unsubscribe
count.set(10); // no output — no more listeners
```

---

### Q97 — Pipeline / builder pattern

```javascript
// QUESTION: Build a data transformation pipeline

class Pipeline {
  constructor(value) {
    this.value = value; // the data being transformed
    this.steps = []; // list of transformation functions
  }

  // Add a transformation step
  pipe(fn) {
    this.steps.push(fn);
    return this; // return this for chaining
  }

  // Execute all steps and return final value
  execute() {
    return this.steps.reduce((val, fn) => fn(val), this.value);
  }
}

// Usage: process a list of orders
const orders = [
  { id: 1, product: "Laptop", price: 999, quantity: 2, status: "active" },
  { id: 2, product: "Mouse", price: 29, quantity: 5, status: "cancelled" },
  { id: 3, product: "Desk", price: 399, quantity: 1, status: "active" },
];

const result = new Pipeline(orders)
  .pipe((orders) => orders.filter((o) => o.status === "active")) // only active
  .pipe((orders) => orders.map((o) => ({ ...o, total: o.price * o.quantity }))) // add total
  .pipe((orders) => orders.sort((a, b) => b.total - a.total)) // sort by total desc
  .pipe((orders) => orders.map((o) => `${o.product}: $${o.total}`)) // format
  .execute();

console.log(result);
// ["Laptop: $1998", "Desk: $399"]
```

---

### Q98 — Implement a type-checking utility

```javascript
// QUESTION: Build a robust type checker that goes beyond typeof

const typeOf = (value) => {
  if (value === null) return "null"; // typeof null is "object" — fix that
  if (Array.isArray(value)) return "array"; // typeof [] is "object" — fix that

  // Object.prototype.toString gives the most accurate result
  // It returns "[object Date]", "[object RegExp]", "[object Map]", etc.
  return Object.prototype.toString
    .call(value)
    .slice(8, -1) // removes "[object " from start and "]" from end
    .toLowerCase(); // "Date" → "date"
};

console.log(typeOf(42)); // "number"
console.log(typeOf("hello")); // "string"
console.log(typeOf(true)); // "boolean"
console.log(typeOf(null)); // "null"
console.log(typeOf(undefined)); // "undefined"
console.log(typeOf([])); // "array"
console.log(typeOf({})); // "object"
console.log(typeOf(new Date())); // "date"
console.log(typeOf(/regex/)); // "regexp"
console.log(typeOf(new Map())); // "map"
console.log(typeOf(new Set())); // "set"
console.log(typeOf(() => {})); // "function"
console.log(typeOf(Symbol())); // "symbol"
```

---

### Q99 — Serialize and deserialize a tree

```javascript
// QUESTION: Convert a nested comment tree to a flat array and back
// Real-world: nested replies in a social app stored as a flat table in a DB

// SERIALIZE: nested tree → flat array with parentId
function flattenTree(nodes, parentId = null) {
  return nodes.reduce((flat, node) => {
    const { children, ...rest } = node; // separate children from data
    flat.push({ ...rest, parentId }); // add this node with its parentId

    if (children?.length) {
      flat.push(...flattenTree(children, node.id)); // recurse for children
    }

    return flat;
  }, []);
}

// DESERIALIZE: flat array → nested tree
function buildTree(flat, parentId = null) {
  return flat
    .filter((node) => node.parentId === parentId) // find nodes at this level
    .map((node) => ({
      ...node,
      children: buildTree(flat, node.id), // recursively build children
    }));
}

// Test
const tree = [
  {
    id: 1,
    text: "Root comment",
    children: [
      { id: 2, text: "Reply 1", children: [{ id: 4, text: "Deep reply", children: [] }] },
      { id: 3, text: "Reply 2", children: [] },
    ],
  },
];

const flat = flattenTree(tree);
console.log(flat);
// [
//   { id: 1, text: "Root comment", parentId: null },
//   { id: 2, text: "Reply 1", parentId: 1 },
//   { id: 4, text: "Deep reply", parentId: 2 },
//   { id: 3, text: "Reply 2", parentId: 1 }
// ]

const rebuilt = buildTree(flat);
// Back to original nested structure ✓
```

---

### Q100 — Implement a simple state machine

```javascript
// QUESTION: Build a finite state machine for a traffic light
// Real-world: order status, video player states, form wizard steps

class StateMachine {
  constructor({ initial, states }) {
    this.current = initial; // starting state
    this.states = states; // all state definitions and their transitions
  }

  // Attempt to transition on a given event
  send(event) {
    const currentState = this.states[this.current];

    if (!currentState) {
      throw new Error(`Unknown state: ${this.current}`);
    }

    const nextState = currentState.on?.[event]; // what state does this event lead to?

    if (!nextState) {
      console.log(`⚠️ Event "${event}" not valid in state "${this.current}"`);
      return this;
    }

    // Exit current state
    currentState.exit?.(); // call exit callback if defined

    // Transition
    const prevState = this.current;
    this.current = nextState;

    // Enter new state
    this.states[nextState].entry?.(); // call entry callback if defined

    console.log(`🚦 ${prevState} → ${event} → ${this.current}`);
    return this; // chainable
  }

  is(state) {
    return this.current === state;
  }
}

// Traffic light state machine
const trafficLight = new StateMachine({
  initial: "red",
  states: {
    red: {
      entry: () => console.log("🔴 STOP"),
      on: { NEXT: "green" },
    },
    green: {
      entry: () => console.log("🟢 GO"),
      on: { NEXT: "yellow" },
    },
    yellow: {
      entry: () => console.log("🟡 SLOW DOWN"),
      on: { NEXT: "red" },
    },
  },
});

trafficLight.send("NEXT"); // 🔴 → 🟢 GO
trafficLight.send("NEXT"); // 🟢 → 🟡 SLOW DOWN
trafficLight.send("NEXT"); // 🟡 → 🔴 STOP
trafficLight.send("BACK"); // ⚠️ "BACK" not valid in state "red"
```

---

## Quick Reference Cheat Sheet

### Things interviewers ALWAYS check

| Concept                   | Common Trap                            | Safe Answer                      |
| ------------------------- | -------------------------------------- | -------------------------------- |
| `var` in loops            | Shares one binding                     | Use `let`                        |
| `==` vs `===`             | Type coercion surprises                | Always use `===`                 |
| `typeof null`             | Returns `"object"`                     | Check `=== null`                 |
| `NaN === NaN`             | Always `false`                         | Use `Number.isNaN()`             |
| Arrow + `this`            | No own `this`                          | Use regular function for methods |
| `async`/`await`           | Must `try/catch`                       | Wrap in try/catch                |
| Promise order             | Microtasks before macrotasks           | Sync → Promises → setTimeout     |
| Mutation vs copy          | `{...obj}` is shallow                  | Use `structuredClone()`          |
| `forEach` + `async`       | Doesn't await                          | Use `for...of`                   |
| Missing `return` in arrow | `(name) => { name }` returns undefined | `(name) => ({ name })`           |

### The 5 questions that trip up everyone

1. `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0) }` → `3, 3, 3`
2. `console.log(typeof null)` → `"object"`
3. `console.log(0.1 + 0.2 === 0.3)` → `false` (floating-point precision!)
4. `console.log([] + {})` → `"[object Object]"`
5. `console.log(NaN === NaN)` → `false`

---

> Good luck out there. The best interviews are conversations, not quizzes.
> Know the _why_ behind each answer — that's what separates a candidate from a hire.
