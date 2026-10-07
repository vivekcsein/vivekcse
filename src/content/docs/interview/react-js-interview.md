---
description: "100 JavaScript and React interview questions with plain-English answers, from ES6+ and async to hooks, performance, React 19, Next.js and TypeScript."
date: 2026-09-12
keywords: [react, javascript, interview, hooks, react 19, nextjs, typescript]
featured: false
---

# Top 100 JavaScript & React Interview Questions (2026 Edition)

A senior-dev style prep guide, written the way I'd actually explain these things to a candidate across the table — no copy-pasted textbook definitions, just plain answers with the "why it matters" baked in. Covers core JavaScript, async patterns, React fundamentals and hooks, modern React 19 features (Actions, Server Components, the Compiler), and Next.js / TypeScript questions that show up constantly in 2026 interview loops.

Use it to study, or steal the structure to run your own interviews.

---

## Part 1 — JavaScript Fundamentals (Q1–15)

### 1. What's the real difference between `var`, `let`, and `const`?

`var` is function-scoped and gets hoisted with a default value of `undefined`, which is exactly why it causes so many subtle bugs in loops. `let` and `const` are block-scoped and live in what's called the "temporal dead zone" until their line actually executes — touch them earlier and you get a `ReferenceError` instead of `undefined`, which is much easier to debug. `const` doesn't make an object immutable, it just locks the variable binding; you can still mutate the object's properties. In interviews, the follow-up to watch for is "can you reassign a const array's contents?" — yes, you can push to it, you just can't reassign the variable itself.

### 2. Explain hoisting.

JavaScript moves declarations to the top of their scope during the compile phase, before any code runs. Function declarations are hoisted fully (you can call them before they appear in the file), `var` is hoisted but initialized as `undefined`, and `let`/`const` are hoisted but stay uninitialized until their actual line runs. A good way to phrase it in an interview: "hoisting doesn't move code around, it just means the engine already knows the variable name exists before it assigns a value to it."

### 3. What's the difference between `==` and `===`?

`===` checks both value and type with no conversion — what you see is what gets compared. `==` runs type coercion first, which leads to surprising results like `'' == 0` being `true` or `null == undefined` being `true`. The practical advice I give candidates: default to `===` everywhere, and only reach for `==` when you specifically want to treat `null` and `undefined` as equivalent, which is rare enough that it's usually clearer to just write that check explicitly.

### 4. What is a closure?

A closure is a function that remembers the variables from the scope it was created in, even after that outer function has finished running. It's how you get private state in JavaScript without classes.

```javascript
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

`count` isn't reachable from outside, but the returned function still has access to it. This is the mechanism behind custom hooks, memoization, and module patterns — it comes up constantly.

### 5. Explain how `this` behaves in JavaScript.

`this` isn't fixed at definition time the way it is in most other languages — it's determined by _how a function is called_. A regular function called as `obj.method()` binds `this` to `obj`. Called standalone, `this` is `undefined` in strict mode. Arrow functions don't have their own `this` at all — they inherit it from the enclosing scope, which is exactly why they're the default choice inside class methods and React event handlers today. `call`, `apply`, and `bind` let you override this binding manually.

### 6. `null` vs `undefined` — what's actually different?

`undefined` means a variable was declared but never assigned a value — it's what JavaScript gives you by default. `null` is something a developer explicitly assigns to say "this is intentionally empty." `typeof undefined` is `"undefined"`, but `typeof null` is (famously, and incorrectly) `"object"`, a bug from the original implementation that's stuck around for compatibility. Functions that don't return anything return `undefined`.

### 7. What are truthy and falsy values?

Every value in JavaScript coerces to either `true` or `false` in a boolean context. The falsy list is short and worth memorizing exactly: `false`, `0`, `-0`, `""`, `null`, `undefined`, and `NaN`. Everything else — including `"0"`, `[]`, and `{}` — is truthy, which trips people up constantly because an empty array or object still passes an `if` check.

### 8. Explain event delegation.

Instead of attaching a listener to every single child element, you attach one listener to a shared parent and use `event.target` to figure out which child was actually clicked. It works because events bubble up the DOM tree. This matters for performance on long lists and is also the foundation React's own synthetic event system uses internally — React attaches one listener at the root and routes events down, rather than wiring up a listener per DOM node.

### 9. Function declarations vs function expressions — what's the difference?

A function declaration (`function foo() {}`) is fully hoisted, so it can be called before it's defined in the file. A function expression (`const foo = function() {}` or an arrow function) is only assigned once execution reaches that line — calling it earlier throws. This is a common gotcha question because people assume all functions hoist the same way.

### 10. What is the event loop?

JavaScript runs on a single thread, so the event loop is the mechanism that lets it handle async work without blocking. Synchronous code runs first on the call stack. Once the stack is empty, the engine checks the microtask queue (Promise callbacks, `queueMicrotask`) and drains it completely before moving to the macrotask queue (`setTimeout`, I/O, UI events). That's why `Promise.resolve().then(...)` always fires before a `setTimeout(..., 0)`, even though both are technically "async."

### 11. Explain prototypal inheritance.

Every object in JavaScript has an internal link to another object called its prototype, and property lookups walk up this chain until they find a match or hit `null`. `class` syntax in modern JS is just a cleaner way to set up this same prototype chain — there's no separate inheritance model underneath. Knowing this matters because it explains why methods defined on a class are shared across instances rather than duplicated per object.

### 12. Deep copy vs shallow copy?

A shallow copy duplicates the top-level structure but nested objects still point to the same reference — mutate a nested value and both copies change. `{...obj}` and `Object.assign` are shallow. A deep copy duplicates everything recursively, so nothing is shared. `structuredClone()` is the modern built-in way to deep clone without reaching for `JSON.parse(JSON.stringify(...))`, which silently breaks on functions, `Date` objects, and `undefined` values.

### 13. What do `call`, `apply`, and `bind` actually do?

All three let you explicitly set what `this` refers to inside a function. `call` invokes the function immediately with arguments passed individually; `apply` does the same but takes arguments as an array; `bind` doesn't invoke anything — it returns a _new_ function with `this` permanently locked in, which you can call later. `bind` is the one you'll actually use day-to-day, usually for passing a method as a callback without losing its context.

### 14. What's a higher-order function?

A function that either takes another function as an argument, returns a function, or both. `map`, `filter`, and `reduce` are the textbook examples, but the concept extends to things like React's HOCs and middleware functions in Express or Redux — they're all the same pattern: wrap behavior around a function without modifying the original.

### 15. Explain currying with a quick example.

Currying transforms a function that takes multiple arguments into a sequence of functions that each take one argument.

```javascript
const add = (a) => (b) => (c) => a + b + c;
add(1)(2)(3); // 6
```

It's useful for creating specialized, reusable versions of a function — like a logger pre-configured with a tag, or an event handler pre-bound to an id. You don't see it constantly in day-to-day React work, but it comes up in interviews as a way to check how comfortable someone is with functions as first-class values.

---

## Part 2 — JavaScript Deep Dive & ES6+ (Q16–30)

### 16. What are template literals good for beyond string interpolation?

Backtick strings let you embed expressions with `${}` and span multiple lines without `\n` concatenation, but the less obvious feature is **tagged templates** — you can prefix a template literal with a function that processes the raw string and interpolated values yourself, which is how libraries like `styled-components` parse CSS-in-JS.

### 17. Explain destructuring.

Destructuring pulls values out of arrays or objects into individual variables in one line, and it supports default values and renaming at the same time: `const { name: userName = 'Guest' } = user`. In React it's everywhere — function component parameters destructure props directly, and hooks like `useState` return an array specifically so you can destructure it with whatever variable names you want.

### 18. Spread operator vs rest parameter — same syntax, different jobs.

Both use `...`, but spread _expands_ a collection (`[...arr1, ...arr2]`, `{...obj, extra: 1}`), while rest _collects_ multiple arguments into a single array inside a function signature (`function sum(...nums) {}`). The quickest way to tell them apart: spread appears where a value is being used or created; rest appears in a function's parameter list.

### 19. What are generators?

A generator is a function that can pause and resume its own execution using `yield`, defined with `function*`. Each call to `.next()` runs until the next `yield` and returns that value, keeping the function's local state alive in between calls. They're the mechanism behind `async`/`await` under the hood, and they're handy for lazily producing infinite sequences or implementing custom iterators without computing everything up front.

### 20. When would you reach for a `Map` or `Set` instead of a plain object or array?

A `Map` preserves insertion order, allows any value (not just strings) as a key, and gives you a direct `.size` property instead of computing `Object.keys(obj).length`. A `Set` automatically deduplicates values and gives you fast `.has()` lookups. If you're doing frequent additions, removals, or membership checks on a collection, `Map`/`Set` are usually both faster and clearer than plain objects/arrays for that job.

### 21. What's a `Symbol` for?

A `Symbol` creates a guaranteed-unique value, typically used as an object property key to avoid name collisions — useful when you're attaching metadata to an object you don't fully control, like a third-party library's instance, without risking overwriting an existing property. You'll also see them used to define custom iteration behavior via `Symbol.iterator`.

### 22. Optional chaining and nullish coalescing — what problem do they solve?

`?.` lets you safely access a deeply nested property without throwing if something along the chain is `null` or `undefined`: `user?.address?.city`. `??` provides a fallback value, but unlike `||`, it only falls back on `null`/`undefined`, not on other falsy values like `0` or `""` — which fixes a real bug class where `count || 10` would incorrectly default to `10` when `count` was legitimately `0`.

### 23. ES Modules vs CommonJS — what's the practical difference?

ES Modules (`import`/`export`) are statically analyzable, meaning tools can determine what's imported without running the code, which is what enables tree-shaking and dead-code elimination in bundlers. CommonJS (`require`/`module.exports`) is resolved at runtime, which is more dynamic but blocks those build-time optimizations. Modern frontend tooling (Vite, Next.js, bundlers in general) is built around ESM by default now, with CommonJS support kept around mostly for older Node packages.

### 24. What's a `WeakMap` and when is it actually useful?

It behaves like a `Map`, but its keys must be objects and aren't strongly held — if nothing else references that object, the garbage collector can clean it up, map entry included. That makes `WeakMap` the right tool for attaching private data to an object (a common pattern for implementing private fields before native private class fields existed) without creating a memory leak by accidentally keeping that object alive forever.

### 25. Synchronous vs asynchronous code — why does the distinction matter so much in JS?

Synchronous code runs top to bottom, blocking everything else until it finishes. Because JavaScript has a single main thread, a long-running synchronous task — a heavy computation, a blocking loop — freezes the UI completely. Asynchronous operations (network requests, timers, file I/O) get handed off and their callbacks are scheduled to run later, which is the only reason a web page can stay responsive while waiting on a slow API call.

### 26. Debounce vs throttle — what's the real-world difference?

Debounce waits for a pause in activity before running — fire it on every keystroke in a search box, and it only actually executes once the user stops typing for, say, 300ms. Throttle guarantees a function runs at most once per fixed interval no matter how often it's triggered, which is the right choice for something like a scroll handler that needs to keep firing periodically but shouldn't run on every single pixel of movement.

### 27. What is memoization?

Caching the result of an expensive function call so that calling it again with the same inputs returns the cached value instead of recomputing. In plain JS you'd build this with a `Map` keyed by the arguments; in React it shows up as `useMemo` and `React.memo`. The tradeoff is always memory for speed — it's only worth it when the computation is genuinely expensive and the inputs repeat often enough to matter.

### 28. `map`, `forEach`, `filter`, `reduce` — when do you reach for each?

`forEach` just iterates, no return value — use it for side effects only. `map` transforms each item and returns a new array of the same length — use it when you need a 1:1 transformation. `filter` returns a subset based on a condition. `reduce` is the most general one — it folds an array down into a single accumulated value, and you can technically implement `map` and `filter` with it, though you usually shouldn't just to keep code readable.

### 29. Shallow vs deep equality — why does this matter for React specifically?

Shallow equality (`===` on each top-level key, which is what `Object.is` and React's own prop comparisons use) only checks references, not nested content — two objects with identical nested data but different references are "not equal." Deep equality recursively compares every nested value. React intentionally uses shallow comparisons in things like `React.memo` and dependency arrays for performance reasons, which is exactly why passing a freshly created object or array as a prop on every render defeats memoization — the reference changes even though the data looks the same.

### 30. Why does immutability matter so much in modern JS apps?

When you never mutate data directly and instead create new copies on every change, two things get a lot easier: tracking what actually changed (a simple reference comparison tells you), and reasoning about state over time, since old snapshots stay intact instead of silently changing underneath you. This is exactly why React's reconciliation and hooks like `useState` expect you to treat state as read-only and always produce a new value rather than mutating the existing one.

---

## Part 3 — Asynchronous JavaScript (Q31–40)

### 31. What is a Promise and what states can it be in?

A Promise represents the eventual result of an async operation. It starts **pending**, and settles exactly once into either **fulfilled** (with a value) or **rejected** (with a reason) — and once settled, it can never change state again. That "settles once" guarantee is what makes Promises more predictable than raw callbacks, where nothing stops a callback from firing multiple times by accident.

### 32. How does `async`/`await` relate to Promises?

It's syntactic sugar over Promises, not a different mechanism. An `async` function always returns a Promise, and `await` pauses execution inside that function until the Promise it's waiting on settles — without blocking the rest of the program, since the engine yields control back to the event loop while waiting. It reads like synchronous code, which is the whole appeal, but you still need `try`/`catch` around `await` calls because a rejected Promise becomes a thrown error at that point.

### 33. `Promise.all` vs `Promise.race` vs `Promise.allSettled` — when do you use each?

`Promise.all` waits for every promise to resolve and rejects immediately if any single one fails — good for "I need all of these to succeed." `Promise.allSettled` waits for everything regardless of failure and gives you a status for each one — good for "run all of these and tell me what happened to each." `Promise.race` resolves or rejects as soon as the _first_ promise settles, win or lose — useful for things like implementing a timeout against a slow request.

### 34. What is "callback hell" and how did the language solve it?

It's the deeply nested, hard-to-read pyramid of code you get when each async step depends on the previous one and they're all callbacks nested inside each other. Promises flattened this with `.then()` chaining, and `async`/`await` flattened it further by letting sequential async steps read like ordinary sequential code. The underlying async nature hasn't changed — just how readable the code looks.

### 35. Microtasks vs macrotasks — why does order matter?

Microtasks (Promise callbacks, `queueMicrotask`) always run before macrotasks (`setTimeout`, `setInterval`, UI events), and the engine fully drains the microtask queue before picking up the next macrotask. This is why a `Promise.resolve().then(fn)` scheduled after a `setTimeout(fn, 0)` will still execute first — it's a question I ask specifically to see if someone actually understands the event loop or has just memorized "Promises are async."

### 36. What happens if an async function throws and nobody catches it?

The function's returned Promise rejects with that error instead of throwing synchronously. If nothing handles that rejection — no `.catch()`, no surrounding `try`/`catch` on an `await` — you get an "unhandled promise rejection" warning, and in Node it can even crash the process depending on configuration. This is a real production bug source, which is why wrapping `await` calls in `try`/`catch` (or having a global rejection handler) isn't optional.

### 37. How do you actually cancel an in-flight `fetch` request?

With an `AbortController`. You create one, pass its `signal` into the fetch call, and call `controller.abort()` whenever you want to cancel — most commonly inside a `useEffect` cleanup function, so a stale request from a component that's already unmounted (or whose dependencies changed) doesn't resolve and try to update state that's no longer relevant.

```javascript
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(/* ... */);
  return () => controller.abort();
}, [url]);
```

### 38. `setTimeout` vs `setInterval`?

`setTimeout` runs a callback once after a delay. `setInterval` keeps firing repeatedly at that interval until you explicitly call `clearInterval`. A subtlety worth mentioning: `setInterval` schedules the _next_ call at a fixed delay regardless of how long the previous callback took, which can cause overlapping or drifting executions for slow callbacks — a common reason people implement repeating timers with recursive `setTimeout` instead, for tighter control.

### 39. How does the call stack relate to async operations?

Synchronous code executes on the call stack directly. When you call something async, it's handed off to the browser/Node runtime (Web APIs, libuv) rather than sitting on the stack — the stack stays clear to keep running other code. Once the async work finishes, its callback gets queued and only runs once the stack is empty again. This is the core reason a `setTimeout(fn, 0)` doesn't run "immediately" — it has to wait for all currently queued synchronous code to finish first.

### 40. What are Web Workers and when would you reach for one?

A Web Worker runs JavaScript on a completely separate thread, so genuinely CPU-heavy work — large data processing, image manipulation, complex calculations — doesn't block the main thread and freeze the UI. Workers can't touch the DOM directly and communicate with the main thread only via message passing, which is a real constraint, but for anything that would otherwise visibly stutter the page, it's the right tool rather than trying to chunk the work with `setTimeout` tricks.

---

## Part 4 — React Fundamentals (Q41–55)

### 41. What is React, in your own words, and why would a team choose it?

React is a library (deliberately not a full framework) for building UIs out of small, reusable components that describe _what_ the UI should look like for a given state, rather than the imperative steps to get there. The big wins are a declarative mental model, a one-way data flow that makes state changes traceable, and an enormous ecosystem and hiring pool — which in practice is just as important as the technical merits.

### 42. What's the Virtual DOM, really?

It's a lightweight JS representation of the actual DOM tree that React keeps in memory. When state changes, React builds a new virtual tree, compares it against the previous one, and only applies the minimal set of real DOM changes needed — because actual DOM operations are expensive, and computing diffs on plain JS objects is cheap by comparison. It's worth noting React doesn't market this as "always faster than direct DOM manipulation" anymore — the real value is the _programming model_ it enables, not raw speed.

### 43. Explain reconciliation.

Reconciliation is the algorithm React runs to figure out what actually changed between the previous and new virtual DOM trees. It uses heuristics to keep this fast rather than doing a full generic tree diff: different component types at the same position trigger a full rebuild of that subtree, same type just gets its props updated, and list items are matched up using `key` rather than position. Since React 18's Fiber architecture, this work can also be paused, prioritized, and resumed instead of running as one uninterruptible block.

### 44. What is JSX and what does it actually compile to?

JSX is syntax that lets you write HTML-like markup directly in JavaScript. It's not understood by browsers — a compiler (Babel, or the SWC compiler Next.js uses) transforms it into plain `React.createElement()` calls (or, with the newer JSX transform, calls to a `jsx()` runtime function) that produce plain JS objects describing the UI. That's worth knowing because it explains why JSX expressions must return a single root element, and why you can drop any valid JS expression inside `{}`.

### 45. State vs props — what's the actual distinction?

Props are data passed _into_ a component from its parent — read-only from the receiving component's point of view. State is data a component owns and manages internally, and changing it triggers a re-render of that component and its children. The shorthand I give junior devs: props flow down, state lives where it's used (or gets lifted up to the nearest common ancestor when multiple components need to share it).

### 46. Controlled vs uncontrolled components?

A controlled component has its value driven entirely by React state — you set `value` and handle `onChange` yourself, so React is the single source of truth. An uncontrolled component manages its own value internally in the DOM, and you read it out on demand via a `ref` instead of tracking every keystroke in state. Controlled inputs are the default recommendation because they make validation and conditional logic straightforward, but uncontrolled inputs avoid a re-render on every keystroke, which can matter for very large forms.

### 47. Composition vs inheritance in React?

React's official guidance is to favor composition — building complex components by combining smaller ones and passing `children` or specific props — rather than building class hierarchies. Inheritance creates tight coupling between parent and child implementations, while composition keeps components independent and far easier to reuse in contexts the original author never anticipated. In practice, you'll almost never see class inheritance used for sharing UI logic in a modern React codebase.

### 48. What are the common ways to do conditional rendering?

Ternaries (`condition ? <A /> : <B />`) for simple either/or cases, `&&` for "render this or nothing" (with the caveat that `0 && <Component />` renders a literal `0`, a classic gotcha), early returns inside the component for handling distinct states like loading/error/empty, and a lookup object or `switch` when you've got more than two or three branches and a chain of ternaries starts getting unreadable.

### 49. Why do list items need a `key`, and why shouldn't it be the array index?

Keys tell React which array item is which across re-renders, so it can match up existing DOM nodes and component state correctly instead of just diffing by position. If you use the index as the key and the list gets reordered, filtered, or has an item removed from the middle, React can mismatch state to the wrong row — a classic bug where the wrong checkbox stays checked after a delete. Keys should be a stable, unique identifier from the actual data, like a database id.

### 50. `React.Fragment` vs wrapping in a `<div>` — does it actually matter?

Yes — an extra `div` adds a real node to the DOM that can break CSS layouts relying on direct child selectors (flex/grid especially) and adds noise to the DOM tree for no reason. `<Fragment>` (or its shorthand `<>...</>`) groups elements for React's purposes without rendering anything extra to the page. The full `Fragment` syntax also supports a `key` prop, which the shorthand doesn't — relevant when fragments are used inside a mapped list.

### 51. What is prop drilling and how do you avoid it?

It's passing a piece of data down through several layers of components that don't actually need it themselves, just to get it to a deeply nested child that does. It's not "wrong" for one or two levels, but it gets painful fast as an app grows. The fix is usually Context for app-wide values that don't change too often (theme, auth, locale), or a dedicated state management library (Zustand, Redux, Jotai) when the state is more complex or updates frequently — Context re-renders every consumer on any change, which makes it a poor fit for high-frequency updates.

### 52. Context API vs Redux — how do you decide?

Context is built into React and great for low-frequency, app-wide values. It has no built-in way to optimize re-renders or handle complex update logic, and every consumer re-renders whenever the context value changes, even if it only cares about part of it. Redux (or similar libraries) gives you a single predictable store, selectors that subscribe only to the slices of state a component actually uses, and dev tools for time-travel debugging — the right call once state logic gets genuinely complex or shared across many unrelated parts of the app, not just deeply nested ones.

### 53. What's a Higher-Order Component?

A function that takes a component and returns a new, enhanced component — `const Enhanced = withAuth(MyComponent)`. It was the standard way to share cross-cutting logic (auth checks, logging, data subscriptions) across components in the pre-hooks era. It's still valid React, but custom hooks have mostly replaced this pattern because they avoid "wrapper hell" (deeply nested HOCs in the component tree) and don't obscure where a prop actually comes from.

### 54. What are render props?

A pattern where a component takes a function as a prop (often literally called `children` or `render`) and calls it with some internal data, letting the consumer decide what to actually render with that data. It solved the same logic-sharing problem HOCs did, just through composition instead of wrapping. Like HOCs, it's mostly been superseded by custom hooks for new code, though you'll still encounter it in some older or library-provided components.

### 55. What are synthetic events?

React wraps native browser events in its own cross-browser-consistent `SyntheticEvent` object, so `onClick`, `onChange`, etc. behave the same way regardless of which browser is running the code. They're pooled and attached via delegation at the root rather than per individual DOM node, for performance. One practical gotcha worth knowing: in older React versions these events were pooled and nullified after the handler ran, so accessing event properties asynchronously failed — this was removed as of React 17, so it's safe to use the event object inside an async callback today.

---

## Part 5 — React Hooks (Q56–67)

### 56. What problem did hooks actually solve?

Before hooks, only class components could hold state or hook into lifecycle methods, which meant any reusable stateful logic had to be shared via HOCs or render props — both of which add extra component layers and make data flow harder to trace ("wrapper hell"). Hooks let function components hold state and side effects directly, and let you extract and reuse that logic as a plain function (a custom hook) without wrapping anything. They also sidestep the recurring confusion around `this` binding in class methods entirely.

### 57. Explain `useState` and its rules.

`useState(initialValue)` returns a pair: the current value and a setter function. Calling the setter schedules a re-render with the new value — it doesn't mutate the existing state in place, even for objects and arrays, so you always provide a brand-new value (or a function that receives the previous state and returns a new one, which matters when you're updating based on the latest value inside something like an event handler that might be using a stale closure otherwise).

### 58. Explain `useEffect`, including cleanup and the dependency array.

`useEffect` runs a side effect after the component renders and commits to the DOM — anything that reaches outside React's rendering model: subscriptions, manual DOM work, fetching data, timers. The dependency array controls when it re-runs: omit it and it runs after every render, pass `[]` and it only runs once on mount, pass specific values and it re-runs whenever any of them change. The optional return function is cleanup, run right before the effect runs again or when the component unmounts — this is exactly where you'd cancel a subscription, clear a timer, or abort a fetch.

### 59. `useEffect` vs `useLayoutEffect` — when does the difference actually matter?

`useEffect` runs asynchronously after the browser has already painted the screen. `useLayoutEffect` runs synchronously _before_ the paint, blocking it. You almost always want `useEffect` — it's non-blocking and doesn't hurt performance. Reach for `useLayoutEffect` only when you need to measure or adjust the DOM (like reading an element's size and repositioning something based on it) before the user has a chance to see a visual flicker.

### 60. `useMemo` vs `useCallback` — what's actually different between them?

They're built on the same memoization idea, but `useMemo` caches a computed _value_, while `useCallback` caches a _function reference_ — `useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)`. Both exist mainly to keep a value or function reference stable across re-renders, which matters when that value gets passed to a memoized child or used in another hook's dependency array. With the React Compiler now handling a lot of this automatically (more on that below), manual use of both is becoming less necessary in newer codebases.

### 61. What's `useRef` actually for?

Two main uses: holding a reference to a DOM node directly (`<input ref={inputRef} />` to call `.focus()` imperatively), and storing a mutable value that persists across renders _without_ triggering a re-render when it changes — unlike state. That second use case covers things like storing a previous value for comparison, holding an interval id to clear later, or tracking whether a component is still mounted inside an async callback.

### 62. When would you reach for `useReducer` over `useState`?

When state updates involve multiple related pieces of data or non-trivial transition logic — think a form with several interdependent fields, or anything resembling a state machine (idle/loading/success/error). `useReducer` centralizes all that update logic into one reducer function instead of scattering several `useState` calls and ad-hoc update logic across the component, which makes the possible state transitions easier to read in one place and easier to test in isolation.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
```

### 63. Explain `useContext`.

It lets a component read a value from the nearest matching `Context.Provider` above it in the tree, without that value being passed down explicitly through every intermediate component as a prop. It's the direct fix for prop drilling — but worth repeating: every component consuming that context re-renders whenever the provided value changes, regardless of which part of the value it actually uses, so it's not a free substitute for a proper state management solution in performance-sensitive trees.

### 64. What are the Rules of Hooks, and why do they exist?

Only call hooks at the top level of a component or another custom hook — never inside loops, conditionals, or nested functions — and only call them from React function components or custom hooks (never plain JS functions). React relies on hooks being called in the _exact same order_ on every single render to correctly associate each hook call with its internal state; breaking that order silently corrupts state between hooks. The `eslint-plugin-react-hooks` rule catches almost all violations automatically, so there's little reason to track this by hand.

### 65. Walk me through building a custom hook.

Any function whose name starts with `use` and that calls other hooks internally is a custom hook — it's not a special React API, just a naming convention React's linter and tooling rely on. You extract logic you find yourself repeating across components — say, tracking a window resize, or debouncing a search value — into a function, call whatever built-in hooks it needs internally, and return whatever the consuming components need.

```javascript
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
```

Each component using it gets its own independent state — a custom hook shares _logic_, not the underlying state itself.

### 66. What is `useEffectEvent` and why was it added?

It's a newer hook (stabilized alongside React 19.2) for pulling non-reactive logic out of an effect — code that needs to read the latest props/state when it runs, but shouldn't actually cause the effect to re-run when those values change. Before this, people worked around it with refs to "smuggle" the latest value into an effect without adding it to the dependency array; `useEffectEvent` makes that intent explicit instead of relying on a ref-based workaround.

### 67. What's `useId` for, and why shouldn't you just use `Math.random()` for element ids?

`useId` generates a stable, unique id that's consistent between server and client renders — critical for accessibility attributes like linking a `<label>` to an `<input>` via `htmlFor`/`id` in components that get rendered many times. `Math.random()` (or any non-deterministic value) generates a _different_ id on the server versus the client during server-side rendering, which causes a hydration mismatch — React detects the server-rendered markup doesn't match what the client would produce and has to throw away and redo work.

---

## Part 6 — React Performance & Advanced Patterns (Q68–77)

### 68. What actually causes unnecessary re-renders, and how do you prevent them?

The most common cause: a parent re-renders, and by default every child re-renders too, regardless of whether its own props actually changed. Add to that passing a brand-new object, array, or function as a prop on every render (which breaks reference equality even when the _contents_ are identical), and you get cascading re-renders that aren't doing anything useful. The fixes, traditionally, were `React.memo` on the child plus `useMemo`/`useCallback` to keep prop references stable — though as covered below, the React Compiler now automates a lot of this.

### 69. Explain `React.memo`.

It wraps a component so React skips re-rendering it if its props are shallowly equal to what they were last render — useful for components that render often but rarely receive genuinely new data. It only helps if the props passed in actually stay referentially stable between renders (which is exactly why it's so often paired with `useCallback`/`useMemo` on the parent side); wrapping a component in `memo` while still passing it a fresh inline object every render accomplishes nothing.

### 70. How do you implement code splitting in React?

`React.lazy()` combined with `<Suspense>`. `lazy()` takes a dynamic `import()` and only loads that component's code when it's actually rendered, and `Suspense` shows a fallback UI while that chunk is loading.

```jsx
const Settings = React.lazy(() => import("./Settings"));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>;
```

This keeps your initial bundle smaller by deferring routes or heavy components (a chart library, a rich text editor) until they're actually needed, rather than shipping everything up front.

### 71. What is the React Compiler, and how does it change how you think about performance?

It's a build-time tool (stable as of React 19/React Compiler 1.0) that analyzes your components and automatically inserts the memoization you used to have to write by hand — effectively doing the job of `useMemo`, `useCallback`, and `React.memo` for you wherever it determines it's safe and beneficial. The practical shift: in a compiler-enabled codebase, reaching for those hooks manually is increasingly the exception rather than the default, and you'd typically only add them yourself after profiling shows the compiler missed something specific. It's not magic for every problem — it doesn't replace virtualization or code splitting — but it does remove a huge amount of the "should I wrap this in useMemo" busywork.

### 72. What's virtualization, and when do you actually need it?

Rendering only the list items currently visible in the viewport (plus a small buffer), and recycling DOM nodes as the user scrolls, instead of rendering every single item up front. It matters once a list gets into the hundreds or thousands of rows — rendering all of them at once tanks both initial render time and scroll performance, since the browser has to manage that many DOM nodes regardless of whether they're visible. Libraries like `react-window` or `react-virtual` (now part of TanStack Virtual) handle the windowing math for you.

### 73. Suspense vs error boundaries — they sound similar, what's different?

They handle two different failure modes during rendering. Suspense catches a component that's _not ready yet_ — typically because it's waiting on a lazy import or an async data source — and shows a fallback until it is. An error boundary catches a component that _threw an actual error_ during render and shows fallback UI instead of letting the whole app crash to a white screen. They're often used together: Suspense for the loading state, an error boundary just outside it for the failure state.

### 74. How do you implement an error boundary?

It has to be a class component (there's still no hook equivalent for catching render errors as of today), implementing either `static getDerivedStateFromError` or `componentDidCatch` to update its own state and render fallback UI instead of crashing.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <FallbackUI />;
    return this.props.children;
  }
}
```

It only catches errors thrown during rendering, lifecycle methods, and constructors — not errors inside event handlers or async code, which need their own `try`/`catch`.

### 75. What changed with concurrent rendering compared to the old model?

Before React 18, rendering was synchronous and uninterruptible — once React started rendering an update, it ran straight through to completion, blocking the main thread the whole time. Concurrent rendering lets React start preparing an update, pause partway through if something more urgent comes in (like user input), and either resume or discard that in-progress work. This is what makes features like `useTransition` and automatic batching possible — React can now prioritize what actually needs to feel instant versus what can render whenever there's spare time.

### 76. Explain `useTransition` and `startTransition`.

They let you mark a state update as non-urgent, so React can deprioritize it behind anything more immediately interactive — like keeping a text input feeling instantly responsive while a large, expensive result list updates slightly behind it instead of janking the keystroke itself. `useTransition` gives you back an `isPending` flag you can use to show a subtle loading indicator while that lower-priority update is in flight.

```jsx
const [isPending, startTransition] = useTransition();
function handleChange(e) {
  setInput(e.target.value); // urgent, updates immediately
  startTransition(() => {
    setResults(filterBigList(e.target.value)); // can be deferred
  });
}
```

### 77. `useDeferredValue` vs `useTransition` — when would you pick one over the other?

They solve the same underlying problem from two different angles. `useTransition` wraps the _update itself_ as low priority — use it when you control the state setter call directly. `useDeferredValue` wraps a _value_ you're consuming, returning a version of it that can lag a render behind the latest while it catches up — useful when the slow part is downstream and out of your direct control, like a value passed down from a parent or coming from a third-party hook where you can't wrap the original `setState` call yourself.

---

## Part 7 — React 19 & Modern React (Q78–85)

### 78. What are "Actions" in React 19?

Actions are functions you can pass directly to `<form action={...}>` (or `<button formAction={...}>`) that React calls automatically with the form's `FormData` when it's submitted, running inside a transition and resetting uncontrolled fields on success. The point is removing the manual boilerplate of calling `preventDefault`, wiring up `onSubmit`, and tracking pending/error state by hand — that bookkeeping is built into the form-handling primitives instead.

### 79. Explain `useActionState`.

It pairs naturally with Actions: you give it an action function and an initial state, and it gives you back the current state, a wrapped action to actually use in your form, and a pending flag — all without you manually managing `isSubmitting`/`error` state yourself.

```jsx
const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
  const result = await submitForm(formData);
  return result.error ? { error: result.error } : { success: true };
}, null);
<form action={formAction}>...</form>;
```

### 80. What is `useOptimistic` for?

It lets you show an optimistic UI update immediately, before the server has actually confirmed it succeeded, and then automatically reconciles back to the real state once the actual response comes in (or rolls back if it fails). Classic use case: a "like" button that visually toggles the instant you click it, rather than waiting on a round trip, while the real mutation runs in the background.

### 81. Explain the `use()` hook — how is it different from `useContext` or `await`?

`use()` is a more flexible primitive that can read a Promise (suspending the component until it resolves, working with Suspense automatically) or read context — and unlike other hooks, it _can_ be called conditionally or inside loops, which breaks the usual Rules of Hooks on purpose because it's designed for exactly that kind of flexible usage. The practical effect: it gives you a much more direct way to consume async data inside rendering without manually wiring up `useEffect` + `useState` just to hold a fetched value.

### 82. What are React Server Components, and how are they different from the SSR you might already know?

Traditional SSR still ships the component's JavaScript to the client and hydrates it there. Server Components render _only_ on the server and never ship their code to the browser at all — the client receives the rendered output, not the component logic — which means they can safely do things like query a database directly, and they shrink the client bundle since none of that code needs to be downloaded or hydrated. They can render Client Components as children, but a Client Component can't import a Server Component directly — the boundary only goes one way.

### 83. What is hydration, and what typically causes a hydration mismatch?

Hydration is the step where React attaches event listeners and internal state to server-rendered HTML already sitting in the page, turning static markup into an interactive app, without re-rendering everything from scratch. A mismatch happens when the markup React generates on the client during this step doesn't match what the server actually sent — common causes are using browser-only APIs (`window`, `localStorage`) during the initial render, generating non-deterministic values like `Math.random()` or `Date.now()` directly in render, or rendering different content based on something only available client-side, like the user's timezone.

### 84. What is the `Activity` component for?

It lets you keep a part of the UI "alive" in the background — hidden visually (effectively `display: none`) while preserving its state and _not_ tearing down its effects the way unmounting normally would — and then bring it back instantly without re-fetching or re-initializing anything. Good fit for things like tab panels or background routes you want to switch back to instantly with whatever scroll position and form state the user left it in.

### 85. What are View Transitions in React 19.2?

A built-in way to animate elements smoothly as they update inside a transition or during navigation — handled declaratively by React rather than you wiring up the browser's View Transitions API and manually coordinating it with React's render timing yourself. It's aimed at the kind of polish that used to require a dedicated animation library or a lot of manual DOM measurement just for things like a shared element smoothly moving between two states.

---

## Part 8 — Next.js & SSR (Q86–95)

### 86. CSR vs SSR vs SSG vs ISR — break down the actual differences.

CSR (client-side rendering) ships a mostly empty HTML shell and builds the page entirely with JavaScript in the browser — simple but slower first paint and worse for SEO. SSR (server-side rendering) renders full HTML on every request on the server — better initial load and SEO, at the cost of server load per request. SSG (static site generation) renders pages once at build time and serves the same static HTML to everyone — fastest possible, but the content is frozen at build time. ISR (incremental static regeneration) is the middle ground: pages are static like SSG but can be regenerated in the background after a configured interval, so content stays reasonably fresh without paying a per-request server cost.

### 87. App Router vs Pages Router — what's actually changed?

The Pages Router is the original file-based routing system, still supported but in maintenance mode — Vercel has been explicit that new features aren't going there anymore. The App Router, built on React Server Components, is the current default for new projects: every file inside `app/` is a Server Component unless you explicitly opt into `"use client"`, layouts nest naturally and persist across navigations without re-rendering, and special files (`loading.tsx`, `error.tsx`) handle loading and error states by convention instead of you wiring that up manually.

### 88. Server Components vs Client Components — how do you decide which a given piece of UI should be?

Default to Server Components for anything that's just rendering data — they can fetch directly with `async`/`await`, never ship JS to the client, and keep the bundle smaller. You only need `"use client"` for anything that requires interactivity or browser-only APIs: state (`useState`), effects, event handlers, or things like `localStorage`. The recommended pattern is keeping Client Components as small, leaf-level pieces of the tree rather than marking a whole page client-side just because one button inside it needs an `onClick`.

### 89. What are Server Actions?

Functions marked with `"use server"` that run exclusively on the server but can be called directly from a Client Component, like a regular async function — no manually building an API route and a separate `fetch` call just to handle a form submission or mutation. Next.js handles the network plumbing under the hood. They're commonly paired with the App Router's form Actions for things like creating a record, then calling `revalidatePath` or `revalidateTag` to refresh any cached data that mutation affects.

### 90. How does data fetching and caching actually work in the App Router?

There are several caching layers stacked together: request memoization deduplicates identical `fetch` calls made multiple times during a single render pass, the Data Cache can persist fetch results across requests with a configurable revalidation window (`fetch(url, { next: { revalidate: 3600 } })`), the Full Route Cache stores entire rendered routes for static pages, and the Router Cache keeps recently visited routes cached client-side for instant back/forward navigation. The practical mental model for 2026: caching defaults are largely opt-in now rather than opt-out, so you're more explicit about what gets cached and for how long than in earlier Next.js versions.

### 91. What's middleware used for in Next.js?

Code that runs at the edge, before a request reaches your actual route — commonly used for auth checks and redirects, A/B test routing, geolocation-based logic, or rewriting requests. It lives in a single `middleware.ts` file at the project root, and the `matcher` config controls exactly which paths it actually runs against, so you're not paying that overhead on every single request if you don't need to.

```typescript
export function middleware(request) {
  const token = request.cookies.get("auth-token");
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = { matcher: ["/dashboard/:path*"] };
```

### 92. Explain dynamic routing and `generateStaticParams`.

A folder like `app/blog/[slug]/page.tsx` creates a dynamic route where `slug` becomes a parameter you can read inside the page. `generateStaticParams` lets you tell Next.js ahead of time which specific values of that parameter should be pre-rendered at build time — the App Router equivalent of the older `getStaticPaths`. Any path you didn't list either gets rendered on demand or returns a 404, depending on how you've configured `dynamicParams`. For something like a blog, pre-rendering known slugs up front gives you the fastest possible page loads for your existing content.

### 93. How do you handle loading and error states in the App Router, without writing custom logic for each page?

By convention, dropping a `loading.tsx` file in a route segment automatically wraps that segment's content in a Suspense boundary and shows that fallback while the page's data is being fetched — no manual `<Suspense>` wiring required. An `error.tsx` file in that same segment automatically catches runtime errors thrown during rendering and shows fallback UI instead of crashing the whole app; it has to be a Client Component since error boundaries rely on class-component lifecycle behavior under the hood.

### 94. What do `"use client"` and `"use server"` actually do?

They're directives, not function calls — placed at the very top of a file, they tell the build tooling which environment that file's code is allowed to run in. `"use client"` marks a file (and everything it imports) as a Client Component, meaning it gets bundled and shipped to the browser and can use hooks/state/event handlers. `"use server"` marks functions as Server Actions that always execute server-side even when called from client code, and never get included in the client bundle. Forgetting `"use client"` on a file that uses `useState` is one of the most common App Router errors people hit early on.

### 95. How would you go about optimizing a Next.js app for Core Web Vitals?

A few concrete levers: use `next/image` for automatic resizing, lazy loading, and modern format conversion instead of plain `<img>` tags; favor Server Components for data-heavy pages so less JS has to ship and hydrate on the client; use `next/font` to avoid layout shift from late-loading web fonts; lean on `loading.tsx`/Suspense to stream in content progressively rather than blocking the whole page on the slowest piece of data; and keep Client Components scoped to genuinely interactive leaves rather than marking entire large sections client-side just because one small part needs interactivity.

---

## Part 9 — TypeScript with React (Q96–100)

### 96. Why bother with TypeScript in a React codebase at all?

The biggest win in practice isn't catching exotic type errors — it's autocomplete and immediate feedback on prop names, shapes, and typos directly in the editor, plus a much safer refactoring experience, since renaming a prop or changing a shape surfaces every place that breaks instead of you finding out at runtime. It also acts as living documentation for what a component actually expects, which matters a lot more once a codebase has more than one contributor.

### 97. How do you type props and state in a function component?

Define an interface or type for the props and use it as the parameter's type; for state, `useState` infers the type from whatever initial value you pass, so you only need an explicit generic when the initial value doesn't fully capture the type (like starting `null` but expecting an object later).

```tsx
interface UserCardProps {
  name: string;
  age?: number;
  onSelect: (id: string) => void;
}
function UserCard({ name, age, onSelect }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null);
  // ...
}
```

### 98. `interface` vs `type` — does it actually matter which one you use?

For typing plain object shapes, they're nearly interchangeable day to day. The real differences: `interface` supports declaration merging (you can re-open and extend it later, which library type definitions rely on) and reads slightly more naturally for object-oriented patterns like `extends`/`implements`. `type` is strictly more flexible since it can represent unions, intersections, tuples, and mapped types that `interface` simply can't express. A reasonable convention: `interface` for component props and public object shapes, `type` for unions and anything more complex.

### 99. How do you type a custom hook's return value?

Just like any other function — annotate the return type, or let TypeScript infer it, but pay attention to tuples specifically, since a hook returning an array (the way `useState` does) needs an explicit tuple type or TypeScript will widen it to a generic array type and lose the specific positional types.

```typescript
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
```

### 100. What are generics, and how would they show up in a reusable component?

Generics let a component or function work with a type that's decided by the caller rather than being hardcoded, while still keeping full type safety — instead of writing a separate `List` component per data type, or giving up and typing everything as `any`.

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
// Usage infers T automatically from the items array:
<List items={users} renderItem={(user) => <span>{user.name}</span>} />;
```

This is exactly the pattern behind generic, reusable components like a `Select`, `Table`, or `List` that need to stay strongly typed no matter what kind of data gets passed into them.

---

## How to actually use this as an interviewer

Don't just read questions off this list in order — pick 6–8 spread across categories based on the role's seniority, and use the follow-ups baked into several of these answers (re-render causes, hydration mismatches, the Rules of Hooks) as natural places to go one level deeper. A candidate who can explain _why_ something works, not just recite the definition, is the one worth a second round.
