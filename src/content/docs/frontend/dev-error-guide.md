---
description: "Why common JavaScript and React errors happen and how to fix them: undefined properties, non-functions, const reassignment, re-renders, hooks rules, try/catch and more."
date: 2026-09-12
keywords: [javascript, react, debugging, errors, hooks, beginners]
featured: false
---

# JavaScript & React Errors Handbook

### The Complete Beginner-to-Professional Interview Guide

> If you can understand **why an error happens**, you can solve almost any bug.
>
> This document teaches JavaScript and React errors like a senior engineer mentoring a junior developer.

---

# Table of Contents

1. Introduction
2. What Actually Happens When Code Runs
3. JavaScript Error Lifecycle
4. Types of JavaScript Errors
5. Syntax Errors
6. Runtime Errors
7. Logical Errors
8. Error Objects
9. Throwing Custom Errors
10. try...catch...finally
11. Promise Error Handling
12. Async/Await Errors
13. Browser Errors
14. Node.js Errors
15. Common JavaScript Errors
16. React Rendering Lifecycle
17. React Error Categories
18. React Render Errors
19. React Hook Errors
20. State Errors
21. Props Errors
22. Event Errors
23. Async React Errors
24. API Errors
25. React Error Boundaries
26. React Strict Mode
27. Common React Interview Questions
28. Debugging Workflow
29. Production Error Handling
30. Best Practices
31. Senior Engineer Checklist

---

# Introduction

Many beginners think errors are bad.

Professional engineers think differently.

An error is simply the program telling you:

> "I expected one thing, but received another."

Learning errors is learning how JavaScript thinks.

---

# How JavaScript Executes Code

Before understanding errors, understand execution.

```
Source Code

↓

Parser

↓

Abstract Syntax Tree (AST)

↓

Compilation

↓

Execution

↓

Memory Allocation

↓

Garbage Collection
```

Errors can happen during any stage.

| Stage       | Possible Error |
| ----------- | -------------- |
| Parsing     | SyntaxError    |
| Compilation | ReferenceError |
| Runtime     | TypeError      |
| Logic       | Wrong Output   |

---

# Three Categories of Errors

```
Errors

├── Syntax Errors
├── Runtime Errors
└── Logical Errors
```

Every bug belongs somewhere here.

---

# 1. Syntax Errors

These happen before your code even starts.

Example

```javascript
const name = ;
```

Output

```
SyntaxError:
Unexpected token ';'
```

Why?

The parser cannot understand your code.

More Examples

Missing bracket

```javascript
if (true {
}
```

Missing comma

```javascript
const user = {
    name: "John"
    age: 20
}
```

Missing quote

```javascript
const a = "Hello;
```

---

# 2. Runtime Errors

The code starts successfully.

Later, something unexpected happens.

Example

```javascript
const user = null;

console.log(user.name);
```

Output

```
TypeError:
Cannot read properties of null
```

The parser is happy.

The runtime is not.

---

# 3. Logical Errors

These are the hardest.

No error message.

Wrong result.

Example

```javascript
function add(a, b) {
  return a - b;
}

add(5, 2);
```

Output

```
3
```

Expected

```
7
```

JavaScript thinks your code is valid.

Humans know it's wrong.

---

# JavaScript Error Object

Every error extends Error.

```javascript
const error = new Error("Something went wrong");
```

Properties

```javascript
error.name;

error.message;

error.stack;

error.cause;
```

Example

```javascript
try {
  throw new Error("Login failed");
} catch (error) {
  console.log(error.name);

  console.log(error.message);

  console.log(error.stack);
}
```

---

# Built-in JavaScript Errors

```
Error

├── SyntaxError
├── TypeError
├── ReferenceError
├── RangeError
├── URIError
├── EvalError
├── AggregateError
```

Let's learn each.

---

# ReferenceError

Variable doesn't exist.

```javascript
console.log(user);
```

Output

```
ReferenceError:
user is not defined
```

Another example

```javascript
function test() {}

console.log(a);
```

---

# TypeError

Wrong type.

Most common interview question.

```javascript
const user = null;

user.name;
```

Output

```
Cannot read properties of null
```

Another

```javascript
const age = 20;

age();
```

Output

```
age is not a function
```

---

# RangeError

Value outside allowed range.

```javascript
new Array(-1);
```

Output

```
RangeError
```

Another

```javascript
Number(1).toFixed(200);
```

---

# URIError

Wrong URI encoding.

```javascript
decodeURIComponent("%");
```

---

# AggregateError

Used with Promise.any()

```javascript
Promise.any([Promise.reject(), Promise.reject()]);
```

---

# Throwing Custom Errors

Instead of waiting for JavaScript...

Throw your own.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

---

# try...catch

```
try

↓

Exception

↓

catch

↓

finally
```

Example

```javascript
try {
  riskyOperation();
} catch (error) {
  console.error(error);
} finally {
  console.log("Always executes");
}
```

---

# finally

Runs no matter what.

Perfect for

- Closing database connections
- Hiding loading spinner
- Cleaning resources

---

# Promise Errors

Without catch()

```javascript
fetch("/api");
```

Output

```
Unhandled Promise Rejection
```

Correct

```javascript
fetch("/api")
.then(...)
.catch(error=>{

});
```

---

# Async Await Errors

Wrong

```javascript
await fetch(url);
```

Correct

```javascript
try {
  await fetch(url);
} catch (error) {}
```

---

# Common JavaScript Errors

## Cannot read properties of undefined

```javascript
user.name;
```

Fix

```javascript
user?.name;
```

---

## x is not a function

```javascript
const age = 20;

age();
```

---

## Assignment to constant variable

```javascript
const a = 10;

a = 20;
```

---

## Unexpected token

Usually

- Missing comma
- Missing bracket
- Wrong quote

---

# React

React introduces another layer.

JavaScript

↓

React

↓

Browser

Errors can happen at all three layers.

---

# React Rendering

Every component goes through

```
Mount

↓

Render

↓

Commit

↓

Effects

↓

Re-render

↓

Unmount
```

Knowing this helps explain almost every React bug.

---

# React Error Categories

```
React Errors

├── Render Errors
├── Hook Errors
├── State Errors
├── Props Errors
├── Event Errors
├── Async Errors
├── Rendering Loops
├── Performance Errors
```

---

# Render Errors

Example

```jsx
const user = null;

return <h1>{user.name}</h1>;
```

Output

```
Cannot read properties of null
```

Fix

```jsx
{
  user?.name;
}
```

---

# React Hook Errors

Most famous.

```
Invalid hook call
```

Why?

Hooks must

- Be at top level
- Never inside loops
- Never inside conditions
- Never inside nested functions

Wrong

```jsx
if (user) {
  useEffect(() => {}, []);
}
```

Correct

```jsx
useEffect(() => {
  if (user) {
  }
}, [user]);
```

---

# Too Many Re-renders

Example

```jsx
function App() {
  const [count, setCount] = useState(0);

  setCount(1);
}
```

Infinite loop.

Fix

Move inside

```
useEffect
```

or

```
Event
```

---

# Maximum Update Depth Exceeded

Usually

```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Loop forever.

---

# Missing Dependency

Example

```jsx
useEffect(() => {
  console.log(user);
}, []);
```

ESLint

```
Missing dependency
```

Correct

```jsx
[user];
```

---

# State Mutation

Wrong

```jsx
user.name = "John";

setUser(user);
```

Correct

```jsx
setUser({
  ...user,

  name: "John",
});
```

---

# Props Errors

Wrong

```jsx
<Profile />
```

Inside

```jsx
props.user.name;
```

Output

```
Cannot read properties of undefined
```

---

# Key Errors

Wrong

```jsx
users.map((user) => <div></div>);
```

Output

```
Each child should have unique key
```

Correct

```jsx
key={user.id}
```

Never use index unless necessary.

---

# Controlled vs Uncontrolled

Wrong

```jsx
<input value={undefined} />
```

Later

```jsx
value = "John";
```

Warning

```
Changing uncontrolled input...
```

---

# Event Errors

Wrong

```jsx
<button onClick={handle()}>
```

Correct

```jsx
<button onClick={handle}>
```

---

# Async Component Errors

Example

```jsx
const data = await fetch();
```

Component renders before data exists.

Solution

Loading state

```jsx
if (isLoading) {
  return <Loader />;
}
```

---

# API Errors

Never trust APIs.

Always check

```
Loading

↓

Success

↓

Error

↓

Empty
```

Example

```jsx
if (error) {
  return <Error />;
}

if (loading) {
  return <Loader />;
}

if (!data) {
  return <Empty />;
}
```

---

# Error Boundaries

React can recover from rendering errors.

Example

```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

They catch

- Render errors
- Lifecycle errors

They DO NOT catch

- Event handlers
- Async functions
- API failures

---

# Strict Mode

React intentionally renders twice in development.

Not a bug.

Purpose

- Detect side effects
- Detect unsafe code
- Prepare concurrent rendering

---

# Debugging Workflow

A senior engineer never randomly changes code.

Follow this process.

```
Read Error

↓

Read Stack Trace

↓

Locate File

↓

Locate Line

↓

Understand Cause

↓

Fix Root Problem

↓

Test Again
```

Never skip reading the stack trace.

---

# Reading Stack Traces

Example

```
TypeError

↓

Profile.jsx

↓

Line 24

↓

render()

↓

App.jsx
```

Always start from the **first line inside your code**, not React internals.

---

# Console Methods

```
console.log()

console.error()

console.warn()

console.table()

console.dir()

console.trace()

console.time()

console.timeEnd()

console.group()

console.groupEnd()
```

Professional debugging relies on more than `console.log`.

---

# Production Error Handling

Instead of

```
Application crashed
```

Show

```
Something went wrong.

Please try again.
```

Log the real error to monitoring software.

Examples

- Sentry
- Bugsnag
- Rollbar

---

# Common Interview Questions

## Why do React components re-render?

Because

- State changed
- Props changed
- Parent rendered
- Context changed

---

## Difference between throw and console.error?

```
throw

↓

Stops execution
```

```
console.error

↓

Only logs
```

---

## Difference between null and undefined?

```
undefined

↓

Not assigned
```

```
null

↓

Intentionally empty
```

---

## Why is mutation bad?

React compares references.

Mutation keeps the same reference.

React may not detect changes.

---

## Why should hooks stay at top level?

React depends on the order of hook calls between renders. Conditional hooks change that order and break React's internal state mapping.

---

## Why use Error Boundaries?

To prevent a single component crash from taking down the entire React application UI.

---

# Best Practices

✅ Read the complete error message.

✅ Read the stack trace.

✅ Understand the root cause before changing code.

✅ Validate API responses.

✅ Prefer optional chaining (`?.`) when values can be absent.

✅ Throw meaningful custom errors.

✅ Never ignore rejected promises.

✅ Keep state immutable.

✅ Use TypeScript to catch many errors before runtime.

✅ Use ESLint and Prettier to catch mistakes early.

✅ Write small, testable functions.

---

# Senior Engineer Checklist

Before asking for help, verify the following:

- [ ] Did I read the entire error message?
- [ ] Did I read the stack trace?
- [ ] Do I know which file failed?
- [ ] Do I know which line failed?
- [ ] Is the value `null` or `undefined`?
- [ ] Am I mutating state?
- [ ] Are my hooks called correctly?
- [ ] Does every list item have a unique key?
- [ ] Did I handle loading, success, empty, and error states?
- [ ] Did I wrap asynchronous code with proper error handling?
- [ ] Can I reproduce the issue consistently?
- [ ] Have I fixed the root cause instead of hiding the symptom?

---

# Final Advice

The strongest engineers are not the ones who memorize every error message—they are the ones who can reason from first principles.

Whenever you encounter an error:

1. Read the full message.
2. Read the stack trace.
3. Reproduce the issue.
4. Understand why it happened.
5. Fix the underlying cause.
6. Verify the fix with tests.

If you build this habit early, you'll debug faster, perform better in interviews, and write more reliable software throughout your career.
