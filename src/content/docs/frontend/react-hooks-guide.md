---
description: "A complete beginner's guide to React hooks in TypeScript, from useState and useEffect to React 19's useActionState, useOptimistic and use(), plus custom hooks."
date: 2026-09-12
keywords: [react, hooks, typescript, react 19, usestate, useeffect, beginners]
featured: true
---

# React Hooks — The Complete Beginner's Guide (2026 Edition)

> Written for someone who has just learned React basics and wants to understand hooks properly.
> Every example uses **TypeScript**, **arrow functions**, and plain English explanations.
> Code comments use `// this style` — read them, they explain every line.

---

## Before we start — what even is a hook?

A hook is a special function React gives you that lets you "hook into" React's internal machinery from inside a component — things like memory (state), side effects, performance optimizations, and more.

**The three rules every beginner must know:**

```typescript
// RULE 1: Only call hooks at the TOP LEVEL of your component
//         Never inside if statements, loops, or nested functions

// RULE 2: Only call hooks inside React function components
//         (or inside other custom hooks)

// RULE 3: Hook names ALWAYS start with 'use'
//         useState, useEffect, useMyCustomHook — always 'use' prefix
```

---

## Table of Contents

| #   | Hook                  | Difficulty        | What it does                        |
| --- | --------------------- | ----------------- | ----------------------------------- |
| 1   | `useState`            | ⭐ Beginner       | Remember data between renders       |
| 2   | `useEffect`           | ⭐ Beginner       | Run code after rendering            |
| 3   | `useRef`              | ⭐ Beginner       | Access DOM + persistent values      |
| 4   | `useContext`          | ⭐ Beginner       | Share data without prop drilling    |
| 5   | `useReducer`          | ⭐⭐ Intermediate | Complex state logic                 |
| 6   | `useMemo`             | ⭐⭐ Intermediate | Cache expensive calculations        |
| 7   | `useCallback`         | ⭐⭐ Intermediate | Cache function references           |
| 8   | `useId`               | ⭐ Beginner       | Generate unique IDs safely          |
| 9   | `useLayoutEffect`     | ⭐⭐ Intermediate | DOM measurements before paint       |
| 10  | `useTransition`       | ⭐⭐ Intermediate | Keep UI responsive during updates   |
| 11  | `useDeferredValue`    | ⭐⭐ Intermediate | Delay expensive renders             |
| 12  | `useImperativeHandle` | ⭐⭐⭐ Advanced   | Control child component from parent |
| 13  | `useActionState`      | ⭐⭐ Intermediate | React 19 — Form actions with state  |
| 14  | `useOptimistic`       | ⭐⭐ Intermediate | React 19 — Instant UI feedback      |
| 15  | `use()`               | ⭐⭐ Intermediate | React 19 — Read Promises + Context  |
| 16  | `useFormStatus`       | ⭐ Beginner       | React 19 — Form submission state    |
| 17  | Custom Hooks          | ⭐⭐ Intermediate | Build your own reusable hooks       |

---

## Hook 1 — `useState`

**Think of it as:** A variable that makes React re-draw your component when its value changes.

Without `useState`, variables in components reset to their initial value every time React re-renders. `useState` gives you a value that _survives_ re-renders.

### The Basics

```typescript
'use client' // needed in Next.js when using hooks

import { useState } from 'react'

const Counter = () => {
  // useState returns TWO things in an array:
  // 1. The current value (count)
  // 2. A function to UPDATE that value (setCount)
  //
  // The 0 inside useState(0) is the STARTING value
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>

      {/* When button is clicked, we call setCount with the new value */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default Counter
```

### TypeScript with `useState`

```typescript
'use client'

import { useState } from 'react'

// Define your data shape as a type
type User = {
  id: number
  name: string
  email: string
}

const UserProfile = () => {
  // TypeScript automatically INFERS the type from the initial value
  const [name, setName] = useState('Alice')       // string
  const [age, setAge] = useState(25)              // number
  const [isLoggedIn, setIsLoggedIn] = useState(false) // boolean

  // When starting with null/undefined, tell TypeScript what it WILL become
  // The <User | null> is called a "generic" — it tells TS what type to expect
  const [user, setUser] = useState<User | null>(null)

  // Arrays — tell TypeScript what's inside the array
  const [tags, setTags] = useState<string[]>([])

  const login = () => {
    // Now TypeScript knows this matches the User type
    setUser({ id: 1, name: 'Alice', email: 'alice@example.com' })
    setIsLoggedIn(true)
  }

  return (
    <div>
      {/* user?.name uses optional chaining because user could be null */}
      <p>{isLoggedIn ? `Welcome, ${user?.name}` : 'Please log in'}</p>
      <button onClick={login}>Log In</button>
    </div>
  )
}

export default UserProfile
```

### Updating State Correctly

```typescript
'use client'

import { useState } from 'react'

const StateUpdateExamples = () => {
  const [count, setCount] = useState(0)

  // ✅ CORRECT: When new value depends on OLD value, use the callback form
  // React gives you the guaranteed latest value as the argument
  const safeIncrement = () => {
    setCount(prevCount => prevCount + 1) // prevCount = guaranteed latest value
  }

  // ❌ WRONG: This can cause bugs in some cases
  const unsafeIncrement = () => {
    setCount(count + 1) // 'count' might be stale in closures
  }

  // Updating OBJECTS — must create a new object, never mutate!
  const [user, setUser] = useState({ name: 'Alice', age: 25 })

  const birthday = () => {
    // ✅ Correct: Spread operator creates a NEW object with updated age
    setUser(prev => ({ ...prev, age: prev.age + 1 }))

    // ❌ Wrong: Never do this — mutating state directly doesn't trigger re-render
    // user.age = user.age + 1
    // setUser(user)
  }

  // Updating ARRAYS — create a new array each time
  const [items, setItems] = useState<string[]>(['apple', 'banana'])

  const addItem = (item: string) => {
    // ✅ Spread the old array and add new item
    setItems(prev => [...prev, item])
  }

  const removeItem = (index: number) => {
    // ✅ Filter creates a brand-new array
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={safeIncrement}>+1</button>

      <p>{user.name} is {user.age} years old</p>
      <button onClick={birthday}>Happy Birthday!</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => removeItem(i)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem('cherry')}>Add Cherry</button>
    </div>
  )
}

export default StateUpdateExamples
```

---

## Hook 2 — `useEffect`

**Think of it as:** "After React draws the screen, run this code."

`useEffect` is for anything that talks to the outside world — APIs, subscriptions, timers, browser APIs, localStorage. It runs _after_ the component renders, not during.

### Understanding the Dependency Array

```typescript
'use client'

import { useState, useEffect } from 'react'

const EffectExamples = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Alice')

  // CASE 1: No dependency array — runs after EVERY single render
  // (Usually not what you want — use carefully)
  useEffect(() => {
    console.log('I run after every render')
  }) // ← no array at all

  // CASE 2: Empty array [] — runs ONCE, when component first appears
  // Like "componentDidMount" in old class-based React
  useEffect(() => {
    console.log('I run only ONCE when component mounts')
  }, []) // ← empty array

  // CASE 3: Array with values — runs when those specific values change
  useEffect(() => {
    console.log('count changed to:', count)
    // This runs when the component mounts AND whenever 'count' changes
  }, [count]) // ← only re-runs when 'count' changes

  // You can watch multiple values
  useEffect(() => {
    console.log('count or name changed')
  }, [count, name]) // ← runs when EITHER changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

export default EffectExamples
```

### Fetching Data with `useEffect`

```typescript
'use client'

import { useState, useEffect } from 'react'

// Define the shape of what we get back from the API
type Post = {
  id: number
  title: string
  body: string
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)  // show spinner while loading
  const [error, setError] = useState<string | null>(null) // hold any error message

  useEffect(() => {
    // This function fetches our data
    const fetchPosts = async () => {
      try {
        setIsLoading(true)  // start showing the spinner
        setError(null)       // clear any old errors

        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

        // Check if the server responded with an error
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const data: Post[] = await response.json()
        setPosts(data) // save the data to state
      } catch (err) {
        // If anything went wrong, save the error message
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false) // always stop the spinner, success or failure
      }
    }

    fetchPosts()
  }, []) // ← empty array means "only fetch when component first appears"

  // Render different UI for each state
  if (isLoading) return <p>Loading posts...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong>
        </li>
      ))}
    </ul>
  )
}

export default PostList
```

### Cleanup — the Return Function

```typescript
'use client'

import { useState, useEffect } from 'react'

const TimerAndSubscription = () => {
  const [seconds, setSeconds] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // CLEANUP EXAMPLE 1: Timer
  useEffect(() => {
    // Start a timer that ticks every second
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // THE CLEANUP FUNCTION — React calls this:
    // 1. When the component is removed from the screen (unmounts)
    // 2. Just before the effect runs again (if dependencies changed)
    //
    // Without cleanup, the timer would keep running even after
    // the component is gone — this is called a "memory leak"
    return () => {
      clearInterval(intervalId) // stop the timer!
    }
  }, []) // ← no dependencies, only start once

  // CLEANUP EXAMPLE 2: Event listeners
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Add the listener when component appears
    window.addEventListener('resize', handleResize)

    // Remove the listener when component disappears
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // CLEANUP EXAMPLE 3: Aborting a fetch when component unmounts
  useEffect(() => {
    // AbortController lets us cancel an in-flight fetch request
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', {
          signal: controller.signal // link fetch to our controller
        })
        const data = await response.json()
        console.log(data)
      } catch (err) {
        // If we aborted, ignore the "AbortError" — it's expected
        if (err instanceof Error && err.name === 'AbortError') return
        console.error(err)
      }
    }

    fetchData()

    // When component unmounts, cancel the fetch
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div>
      <p>Timer: {seconds}s</p>
      <p>Window width: {windowWidth}px</p>
    </div>
  )
}

export default TimerAndSubscription
```

---

## Hook 3 — `useRef`

**Think of it as:** A box that holds a value that won't trigger a re-render when it changes. Also used to point directly at a DOM element.

`useRef` has two main jobs:

1. **Hold a reference to a DOM element** (so you can call `.focus()`, `.scrollTo()`, etc.)
2. **Store a value that persists across renders without causing re-renders**

```typescript
'use client'

import { useRef, useState, useEffect } from 'react'

const RefExamples = () => {
  // JOB 1: Point to a DOM element
  // React will fill this ref with the actual <input> DOM node after render
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const focusInput = () => {
    // inputRef.current is the actual <input> element
    // We can call any DOM method on it
    inputRef.current?.focus() // optional chaining in case it's null
  }

  // JOB 2: Store a value that survives re-renders WITHOUT causing re-renders
  //
  // Example: track how many times a button was clicked
  // without showing it in the UI (no need to re-render for this)
  const clickCountRef = useRef(0)

  // Example: store the previous value of a state
  const [text, setText] = useState('')
  const previousTextRef = useRef('')

  useEffect(() => {
    // After each render, save the current text as "previous"
    // This runs AFTER the render, so previousTextRef.current
    // still holds last render's value DURING this render
    previousTextRef.current = text
  }) // no array — runs every render, but doesn't CAUSE a render

  const handleButtonClick = () => {
    clickCountRef.current += 1 // update ref — no re-render!
    console.log('Total clicks:', clickCountRef.current)
  }

  return (
    <div>
      {/* The ref prop connects this DOM element to our ref */}
      <input ref={inputRef} placeholder="I'll get focused" />
      <button onClick={focusInput}>Focus the input</button>

      <hr />

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Current: {text}</p>
      <p>Previous: {previousTextRef.current}</p>

      <hr />

      <button onClick={handleButtonClick}>
        Click me (check console — no re-render!)
      </button>
    </div>
  )
}

export default RefExamples
```

### `useRef` for Interval IDs (Very Common Pattern)

```typescript
'use client'

import { useRef, useState } from 'react'

const StopWatch = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Store the interval ID in a ref — we need it to stop the timer
  // It's a ref (not state) because changing it shouldn't re-render
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    if (isRunning) return // don't start a second timer

    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1) // increment every 100ms
    }, 100)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current) // stop the timer
      intervalRef.current = null          // clear the ref
    }
    setIsRunning(false)
  }

  const reset = () => {
    stop()
    setTime(0)
  }

  // Format: 00:00.0
  const formatted = `${String(Math.floor(time / 600)).padStart(2, '0')}:${String(Math.floor((time % 600) / 10)).padStart(2, '0')}.${time % 10}`

  return (
    <div>
      <p style={{ fontSize: '3rem', fontFamily: 'monospace' }}>{formatted}</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default StopWatch
```

---

## Hook 4 — `useContext`

**Think of it as:** A way to share data with many components at once without passing props through every layer.

Without context, you'd have to pass a prop through every component between the one that _has_ the data and the one that _needs_ it — called "prop drilling." Context skips all the layers in between.

### Step 1: Create the Context

```typescript
// src/packages/context/ThemeContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// Define what data lives in this context
type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

// Create the context with a default value
// The default is used when a component isn't wrapped in the Provider
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}, // empty function as placeholder
})

// The Provider component wraps your app (or part of it) to share data
// Any component INSIDE this Provider can access the theme
type ThemeProviderProps = {
  children: ReactNode // 'children' means whatever is nested inside this component
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    // The 'value' prop is what gets shared with all consumers
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use this context — always export this!
// It's cleaner than importing and calling useContext(ThemeContext) everywhere
const useTheme = () => {
  const context = useContext(ThemeContext)
  return context
}

export { ThemeProvider, useTheme }
```

### Step 2: Wrap your app

```typescript
// src/app/layout.tsx (Next.js) or src/main.tsx (Vite)
import { ThemeProvider } from '@packages/context/ThemeContext'
import type { ReactNode } from 'react'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {/* ThemeProvider wraps everything — all children can now use useTheme() */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
```

### Step 3: Use the context anywhere in the tree

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from '@packages/context/ThemeContext'

// This component doesn't need ANY props — it reads from context directly!
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme() // grab what we need from context

  return (
    <button onClick={toggleTheme}>
      Currently: {theme} — Click to switch!
    </button>
  )
}

export default ThemeToggle
```

### A More Realistic Auth Context

```typescript
// src/components/providers/AuthProvider.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Replace with your real API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data: User = await response.json()
      setUser(data)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null, // derived from user
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook with a safety check — throws if used outside provider
const useAuth = () => {
  const context = useContext(AuthContext)

  // If context is null, the hook was used outside the Provider
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }

  return context
}

export { AuthProvider, useAuth }
```

---

## Hook 5 — `useReducer`

**Think of it as:** A more organized `useState` for complex state with multiple related pieces or non-trivial update logic. Instead of many `setState` calls scattered around, all state changes go through one central function.

```typescript
'use client'

import { useReducer } from 'react'

// 1. Define the SHAPE of your state
type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  isLoading: boolean
  error: string | null
}

// 2. Define all POSSIBLE actions (what can happen to the state)
//    Using a union type means TypeScript knows exactly what each action looks like
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }

// 3. The REDUCER function — takes current state + action, returns new state
//    Think of it as a big switch statement where each case handles one action type
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Check if this item already exists in cart
      const existingItem = state.items.find(item => item.id === action.payload.id)

      if (existingItem) {
        // Item exists — increase quantity instead of adding a duplicate
        return {
          ...state, // keep everything else the same
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // only change this item
              : item // leave other items unchanged
          ),
        }
      }

      // New item — add it with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    // TypeScript will warn you if you miss a case
    default:
      return state
  }
}

// 4. Use it in your component
const ShoppingCart = () => {
  // useReducer takes the reducer function and the initial state
  // Returns current state + a dispatch function to send actions
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: false,
    error: null,
  })

  // To change state, you "dispatch" an action
  // You never call the reducer directly — dispatch does it for you
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // Calculate total price from current items
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2>Shopping Cart ({state.items.length} items)</h2>

      {state.items.map(item => (
        <div key={item.id}>
          <span>{item.name} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <p>Total: ${total.toFixed(2)}</p>

      <button onClick={() => addItem({ id: 1, name: 'Apple', price: 0.99 })}>
        Add Apple
      </button>
      <button onClick={() => addItem({ id: 2, name: 'Banana', price: 0.49 })}>
        Add Banana
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

export default ShoppingCart
```

---

## Hook 6 — `useMemo`

**Think of it as:** A way to remember the result of an expensive calculation so React doesn't redo it on every render unnecessarily.

```typescript
'use client'

import { useState, useMemo } from 'react'

type Product = {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}

const ProductList = ({ products }: { products: Product[] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  // WITHOUT useMemo, this filtering code runs on EVERY single render —
  // even when only the unrelated UI (like a counter elsewhere) changed.
  // If 'products' has 10,000 items, this is expensive!

  // WITH useMemo, the calculation only re-runs when the dependencies change
  // (searchQuery, selectedCategory, showInStockOnly, or products)
  const filteredProducts = useMemo(() => {
    console.log('🔄 Filtering products...') // Watch this in DevTools!

    return products
      .filter(p => {
        // Check search query
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
        // Check category
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
        // Check stock status
        const matchesStock = !showInStockOnly || p.inStock

        return matchesSearch && matchesCategory && matchesStock
      })
      .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
  }, [products, searchQuery, selectedCategory, showInStockOnly])
  // ↑ Only re-calculate when these values change

  // Also memoize the derived list of unique categories
  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p.category))
    return ['all', ...Array.from(unique)]
  }, [products]) // only re-calculate when products change

  return (
    <div>
      <input
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={e => setShowInStockOnly(e.target.checked)}
        />
        In stock only
      </label>

      <p>{filteredProducts.length} results</p>

      {filteredProducts.map(product => (
        <div key={product.id}>
          <strong>{product.name}</strong> — ${product.price}
          {!product.inStock && <span> (Out of stock)</span>}
        </div>
      ))}
    </div>
  )
}

export default ProductList
```

> ⚠️ **Beginner tip:** Don't wrap EVERYTHING in `useMemo`. It has its own cost. Only use it when a calculation is genuinely slow, or when you need a stable reference for another hook's dependency array.

---

## Hook 7 — `useCallback`

**Think of it as:** Like `useMemo` but for _functions_ instead of values. It gives you a stable function reference that doesn't change on every render.

**Why does this matter?** If you pass a function as a prop to a child component, that function is recreated on every render. This defeats the purpose of memoizing the child with `React.memo`.

```typescript
'use client'

import { useState, useCallback, memo } from 'react'

// React.memo makes a component only re-render when its PROPS actually change
// Without memo, it re-renders whenever the parent re-renders
const ExpensiveButton = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`🔴 ${label} re-rendered`) // only want to see this when truly needed
  return <button onClick={onClick}>{label}</button>
})

ExpensiveButton.displayName = 'ExpensiveButton'

const Parent = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // ❌ WITHOUT useCallback — a NEW function is created every render
  // Even when only 'text' changes, this function changes → ExpensiveButton re-renders!
  const handleIncrementBad = () => setCount(c => c + 1)

  // ✅ WITH useCallback — same function reference is reused between renders
  // ExpensiveButton only re-renders when the dependencies actually change
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // empty array = this function never needs to change

  // This callback DOES change when 'count' changes (because it uses 'count')
  // So we add 'count' to the dependency array
  const handleIncrementBy = useCallback((amount: number) => {
    setCount(c => c + amount)
  }, []) // 'setCount' is stable and doesn't need to be in deps

  return (
    <div>
      <p>Count: {count}</p>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here..." />

      {/* This will re-render on every keystroke (bad!) */}
      <ExpensiveButton onClick={handleIncrementBad} label="Bad button (re-renders a lot)" />

      {/* This only re-renders when handleIncrement changes (never, in this case) */}
      <ExpensiveButton onClick={handleIncrement} label="Good button (stable)" />
    </div>
  )
}

export default Parent
```

---

## Hook 8 — `useId`

**Think of it as:** A way to generate unique IDs that are consistent between the server and the client — important for accessibility and SSR.

```typescript
'use client'

import { useId } from 'react'

// Without useId, you might write id="name-input" — but if this component
// is used TWICE on the same page, you'd have two elements with the same ID!
// useId generates a unique ID for EACH instance of the component

type FormFieldProps = {
  label: string
  type?: string
  placeholder?: string
}

const FormField = ({ label, type = 'text', placeholder }: FormFieldProps) => {
  // Each time FormField is rendered, it gets its own unique ID
  // React guarantees this is unique AND consistent server/client
  const inputId = useId()

  return (
    <div>
      {/* htmlFor links the label to the input — crucial for accessibility */}
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}      // matches the label's htmlFor
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

// Example of using FormField multiple times — each gets a unique ID
const SignupForm = () => {
  return (
    <form>
      {/* Each FormField instance gets its own unique ID — no conflicts! */}
      <FormField label="First Name" placeholder="Alice" />
      <FormField label="Email" type="email" placeholder="alice@example.com" />
      <FormField label="Password" type="password" />
    </form>
  )
}

export default SignupForm
```

---

## Hook 9 — `useLayoutEffect`

**Think of it as:** Just like `useEffect`, but runs synchronously BEFORE the browser paints the screen. Use it when you need to measure or change the DOM before the user sees it.

```typescript
'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'

// Problem: With useEffect, there can be a visible flicker
// because the browser paints BEFORE the effect runs
//
// Solution: useLayoutEffect runs BEFORE the paint — no flicker!

const TooltipPositioner = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipStyle, setTooltipStyle] = useState({ top: 0, left: 0 })

  // useLayoutEffect: runs BEFORE browser paint
  // Perfect for measuring DOM to calculate position
  useLayoutEffect(() => {
    if (!showTooltip || !tooltipRef.current) return

    // Measure the tooltip's size and position
    const rect = tooltipRef.current.getBoundingClientRect()

    // If tooltip would go off the right edge, move it left
    if (rect.right > window.innerWidth) {
      setTooltipStyle(prev => ({
        ...prev,
        left: window.innerWidth - rect.width - 10 // 10px padding from edge
      }))
    }

    // If tooltip would go below the screen, move it up
    if (rect.bottom > window.innerHeight) {
      setTooltipStyle(prev => ({
        ...prev,
        top: prev.top - rect.height - 20
      }))
    }
  }, [showTooltip]) // re-calculate when tooltip visibility changes

  return (
    <div style={{ position: 'relative' }}>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Hover me
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: tooltipStyle.top,
            left: tooltipStyle.left,
            background: 'black',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          This tooltip stays on screen!
        </div>
      )}
    </div>
  )
}

export default TooltipPositioner
```

> 💡 **Rule of thumb:** Default to `useEffect`. Only switch to `useLayoutEffect` if you see a visual flicker — that's the signal that you need it.

---

## Hook 10 — `useTransition`

**Think of it as:** A way to tell React "this update is not urgent — keep the UI responsive and update this in the background."

```typescript
'use client'

import { useState, useTransition } from 'react'

// Simulate a slow component that takes time to render
const generateItems = (query: string) => {
  // Pretend this is a massive list that's slow to filter
  return Array.from({ length: 10_000 }, (_, i) => `Item ${i}: ${query}`)
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 50) // just show first 50 results
}

const SearchWithTransition = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  // isPending is true while the transition is in progress
  // startTransition marks an update as low priority
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Urgent update: input responds immediately (no startTransition)
    setQuery(value)

    // Non-urgent update: results can wait — wrapped in startTransition
    // React will prioritize keeping the input responsive over updating results
    startTransition(() => {
      const filtered = generateItems(value)
      setResults(filtered)
    })
  }

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search 10,000 items..."
      />

      {/* Show a subtle indicator while the transition is processing */}
      {isPending && <p style={{ color: 'gray' }}>Updating results...</p>}

      {/* Even while isPending, the input above stays responsive! */}
      <ul>
        {results.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p>
        {isPending ? 'Loading...' : `${results.length} results`}
      </p>
    </div>
  )
}

export default SearchWithTransition
```

---

## Hook 11 — `useDeferredValue`

**Think of it as:** Similar to `useTransition`, but you wrap the _value_ instead of the _setter call_. Use it when you don't control where the state is set (like when data comes from a parent).

```typescript
'use client'

import { useState, useDeferredValue, memo } from 'react'

// This component is SLOW to render — lots of items
const HeavyList = memo(({ query }: { query: string }) => {
  // Simulate slow rendering
  const items = Array.from({ length: 5000 }, (_, i) => `Item ${i}`)
    .filter(item => item.includes(query))

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
})

HeavyList.displayName = 'HeavyList'

const SearchPage = () => {
  const [query, setQuery] = useState('')

  // useDeferredValue creates a "lagging" copy of query
  // The input updates immediately with 'query'
  // HeavyList gets 'deferredQuery' which updates only when React has time
  const deferredQuery = useDeferredValue(query)

  // Is the deferred value behind the actual value?
  const isStale = query !== deferredQuery

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {/* Dim the list slightly while it's catching up */}
      <div style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        {/* HeavyList receives the deferred (possibly old) query */}
        <HeavyList query={deferredQuery} />
      </div>
    </div>
  )
}

export default SearchPage
```

---

## Hook 12 — `useImperativeHandle`

**Think of it as:** A way to let a parent component call specific methods on a child component directly — like telling a child "I want to be able to call `.focus()` and `.reset()` on you from outside."

```typescript
'use client'

import { useRef, useImperativeHandle, forwardRef, useState } from 'react'

// Define what methods the parent can call on this component
type CustomInputHandle = {
  focus: () => void
  clear: () => void
  getValue: () => string
}

type CustomInputProps = {
  placeholder?: string
  label: string
}

// forwardRef allows the parent to pass a ref into this component
const CustomInput = forwardRef<CustomInputHandle, CustomInputProps>(
  ({ placeholder, label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')

    // useImperativeHandle defines what the ref exposes to the parent
    // The parent can ONLY call these specific methods — nothing else
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus() // delegate to the real DOM input
      },
      clear: () => {
        setValue('')               // clear our state
        inputRef.current?.focus() // focus after clearing
      },
      getValue: () => value,       // let parent read the current value
    }))

    return (
      <div>
        <label>{label}</label>
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    )
  }
)

CustomInput.displayName = 'CustomInput'

// PARENT component — calls methods on the child via ref
const FormWithCustomInput = () => {
  // The ref is typed with CustomInputHandle — TypeScript knows what methods exist
  const nameInputRef = useRef<CustomInputHandle>(null)

  const handleSubmit = () => {
    const name = nameInputRef.current?.getValue()
    console.log('Submitted name:', name)
    nameInputRef.current?.clear() // clear after submit
  }

  return (
    <div>
      <CustomInput ref={nameInputRef} label="Your name" placeholder="Alice" />
      <button onClick={() => nameInputRef.current?.focus()}>Focus input</button>
      <button onClick={() => nameInputRef.current?.clear()}>Clear input</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default FormWithCustomInput
```

---

## Hook 13 — `useActionState` _(React 19)_

**Think of it as:** The cleanest way to handle form submissions in React 19. It tracks pending state, errors, and the result of a form action — all with minimal boilerplate.

```typescript
'use client'

import { useActionState } from 'react'

// Define what the form state looks like
type FormState = {
  message: string
  errors: {
    name?: string
    email?: string
  }
  success: boolean
}

// The initial state before the form is ever submitted
const initialState: FormState = {
  message: '',
  errors: {},
  success: false,
}

// The action function — receives previous state + FormData
// Must be async (or return a Promise)
// In Next.js you'd put this in a server action file with 'use server'
const submitContactForm = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  // Extract data from the form
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Validate
  const errors: FormState['errors'] = {}
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters'
  if (!email || !email.includes('@')) errors.email = 'Please enter a valid email'

  // If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return { message: 'Please fix the errors below.', errors, success: false }
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  return {
    message: `Thanks ${name}! We'll be in touch at ${email}.`,
    errors: {},
    success: true,
  }
}

const ContactForm = () => {
  // useActionState takes: the action function + initial state
  // Returns: [currentState, formAction, isPending]
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    // Pass formAction to the form's action prop — React handles the rest
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
        {/* Show field-specific error if it exists */}
        {state.errors.name && <p style={{ color: 'red' }}>{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        {state.errors.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>

      {/* The general message (success or general error) */}
      {state.message && (
        <p style={{ color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}

      {/* Disable the button while the action is running */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
```

---

## Hook 14 — `useOptimistic` _(React 19)_

**Think of it as:** Show the user a "pretend" updated state immediately, then sync with the real server response when it arrives. Makes your app feel instant.

```typescript
'use client'

import { useState, useOptimistic } from 'react'

type TodoItem = {
  id: number
  text: string
  completed: boolean
}

// Simulate an API call that takes 1 second
const toggleTodoAPI = async (id: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  // In real life, this would call your backend
}

const OptimisticTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: false },
    { id: 3, text: 'Read a book', completed: true },
  ])

  // useOptimistic takes the real state + an "updater" function
  // optimisticTodos = what we SHOW the user (might be ahead of real state)
  // addOptimisticUpdate = call this to immediately apply a visual change
  const [optimisticTodos, addOptimisticUpdate] = useOptimistic(
    todos,
    // This updater runs immediately with the "fake" data
    (currentTodos: TodoItem[], toggledId: number) => {
      return currentTodos.map(todo =>
        todo.id === toggledId
          ? { ...todo, completed: !todo.completed } // flip it immediately
          : todo
      )
    }
  )

  const handleToggle = async (id: number) => {
    // STEP 1: Immediately update the UI (optimistic)
    // The user sees the change RIGHT NOW
    addOptimisticUpdate(id)

    try {
      // STEP 2: Actually call the API (slow)
      await toggleTodoAPI(id)

      // STEP 3: Update real state to match (sync)
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    } catch (error) {
      // If the API call FAILS, useOptimistic automatically reverts
      // back to the original 'todos' state — no extra work needed!
      console.error('Failed to toggle todo:', error)
    }
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li
          key={todo.id}
          onClick={() => handleToggle(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer',
          }}
        >
          {todo.completed ? '✅' : '⬜'} {todo.text}
        </li>
      ))}
    </ul>
  )
}

export default OptimisticTodoList
```

---

## Hook 15 — `use()` _(React 19)_

**Think of it as:** A hook that can read a Promise directly in a component (works with Suspense) or read a Context value. Unlike `useContext`, it CAN be called conditionally.

```typescript
'use client'

import { use, createContext, Suspense } from 'react'

// --- USE WITH CONTEXT ---

type UserContextType = {
  name: string
  role: 'admin' | 'user'
}

const UserContext = createContext<UserContextType | null>(null)

// use() reads context — unlike useContext, it can be called conditionally
const UserBadge = ({ showRole }: { showRole: boolean }) => {
  // This is valid in React 19 — conditional context reading!
  if (!showRole) {
    return <span>User</span>
  }

  // use() can be called after an if statement (not possible with useContext)
  const user = use(UserContext)
  if (!user) return null

  return (
    <span>
      {user.name} ({user.role})
    </span>
  )
}

// --- USE WITH PROMISES ---

// Create a promise that fetches data
const fetchMessage = (): Promise<string> =>
  new Promise(resolve => setTimeout(() => resolve('Hello from the server!'), 1000))

// Pass the promise as a PROP to the component
// React suspends the component until the promise resolves
const MessageDisplay = ({ messagePromise }: { messagePromise: Promise<string> }) => {
  // use() reads the promise — if it's not done yet, React suspends this component
  // and shows the nearest Suspense fallback
  const message = use(messagePromise)

  return <p>{message}</p>
}

// The PARENT creates the promise and passes it down
// The promise must be created OUTSIDE the component to avoid re-creating on each render
const messagePromise = fetchMessage()

const AsyncPage = () => {
  return (
    <UserContext.Provider value={{ name: 'Alice', role: 'admin' }}>
      {/* UserBadge examples */}
      <UserBadge showRole={false} />
      <UserBadge showRole={true} />

      {/* Suspense shows fallback while the promise is pending */}
      <Suspense fallback={<p>Loading message...</p>}>
        <MessageDisplay messagePromise={messagePromise} />
      </Suspense>
    </UserContext.Provider>
  )
}

export default AsyncPage
```

---

## Hook 16 — `useFormStatus` _(React 19)_

**Think of it as:** A hook that tells you about the parent form's submission state — great for building submit buttons and loading states that are _inside_ a form.

```typescript
'use client'

import { useFormStatus } from 'react-dom'

// This component MUST be a CHILD of a <form> element to work
// It reads the form's submission state from a parent context
const SubmitButton = ({ label = 'Submit' }: { label?: string }) => {
  // pending = true when the form's action is currently running
  const { pending, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <span>
          {/* Simple CSS spinner */}
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            border: '2px solid white',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            marginRight: '8px',
          }} />
          Processing...
        </span>
      ) : label}
    </button>
  )
}

// A form field that also knows about loading state
const FormInput = ({ name, label, type = 'text' }: {
  name: string
  label: string
  type?: string
}) => {
  const { pending } = useFormStatus()

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={pending} // disable inputs while submitting
      />
    </div>
  )
}

// Parent form that uses these components
const LoginForm = () => {
  const handleLogin = async (formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Login attempt:', { email, password })
  }

  return (
    <form action={handleLogin}>
      {/* These components automatically know when the form is submitting */}
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="password" label="Password" type="password" />
      <SubmitButton label="Log In" />
    </form>
  )
}

export default LoginForm
```

---

## Hook 17 — Building Your Own Custom Hooks

**Think of it as:** Pulling out hook logic that you repeat across multiple components into a single reusable function.

Custom hooks are just functions that:

- Start with `use`
- Call other hooks inside them
- Return whatever the consuming component needs

### Custom Hook 1: `useLocalStorage`

```typescript
// src/packages/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

// T is a generic — this hook works with ANY type of data
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This function runs only once on mount — reads from localStorage
    if (typeof window === "undefined") {
      // On the server (Next.js SSR), localStorage doesn't exist
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // If key exists, parse it; otherwise use initial value
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Whenever storedValue changes, sync it back to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Return the same interface as useState — feels familiar to use
  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
```

```typescript
// Usage in a component
'use client'

import useLocalStorage from '@packages/hooks/useLocalStorage'

const Settings = () => {
  // Works exactly like useState, but persists across page refreshes!
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  const [fontSize, setFontSize] = useLocalStorage<number>('fontSize', 16)

  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme: {theme}
      </button>
      <button onClick={() => setFontSize(s => s + 2)}>
        Font size: {fontSize}px
      </button>
    </div>
  )
}

export default Settings
```

### Custom Hook 2: `useFetch`

```typescript
// src/packages/hooks/useFetch.ts
import { useState, useEffect, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type UseFetchReturn<T> = FetchState<T> & {
  refetch: () => void; // let the component manually trigger a refetch
};

const useFetch = <T>(url: string): UseFetchReturn<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const controller = new AbortController();

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

      const data: T = await response.json();
      setState({ data, isLoading: false, error: null });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState({
        data: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }

    // Return cleanup function
    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    fetchData().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => cleanup?.();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

export default useFetch;
```

```typescript
// Usage — clean and simple, all the complexity is in the hook
'use client'

import useFetch from '@packages/hooks/useFetch'

type Post = { id: number; title: string; body: string }

const BlogPosts = () => {
  const { data: posts, isLoading, error, refetch } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error} <button onClick={refetch}>Retry</button></p>

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {posts?.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  )
}

export default BlogPosts
```

### Custom Hook 3: `useDebounce`

```typescript
// src/packages/hooks/useDebounce.ts
import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after 'delay' ms
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If value changes before the timer fires, cancel it and start fresh
    // This is the core of debouncing!
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```

```typescript
// Usage
'use client'

import { useState, useEffect } from 'react'
import useDebounce from '@packages/hooks/useDebounce'

const SearchBar = () => {
  const [query, setQuery] = useState('')

  // Wait 500ms after the user stops typing before using the value
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery) return
    // This only fires 500ms after the user stops typing
    console.log('Searching for:', debouncedQuery)
    // Make your API call here
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}

export default SearchBar
```

### Custom Hook 4: `useWindowSize`

```typescript
// src/packages/hooks/useWindowSize.ts
import { useState, useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
};

const useWindowSize = (): WindowSize => {
  // Start with window dimensions (or 0 for SSR)
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up — remove listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // empty array — set up listener once, remove once

  return size;
};

export default useWindowSize;
```

### Custom Hook 5: `useOnClickOutside`

```typescript
// src/packages/hooks/useOnClickOutside.ts
import { useEffect } from "react";
import type { RefObject } from "react";

// T extends HTMLElement — this works with any DOM element type
const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      // If the click target is INSIDE our ref'd element, do nothing
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      // Click was OUTSIDE — call the callback
      callback();
    };

    // Listen for both mouse and touch events
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, callback]); // re-run if ref or callback changes
};

export default useOnClickOutside;
```

```typescript
// Usage: close a dropdown when clicking outside
'use client'

import { useState, useRef } from 'react'
import useOnClickOutside from '@packages/hooks/useOnClickOutside'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when user clicks anywhere outside it
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setIsOpen(prev => !prev)}>
        Menu {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <ul style={{
          position: 'absolute',
          background: 'white',
          border: '1px solid #ccc',
          listStyle: 'none',
          padding: '8px',
          margin: 0,
        }}>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  )
}

export default Dropdown
```

---

## Quick Reference Cheat Sheet

```typescript
// useState — remember changing data
const [value, setValue] = useState<Type>(initialValue);

// useEffect — run code after render (side effects)
useEffect(() => {
  // do something
  return () => {
    /* cleanup */
  };
}, [dependencies]);

// useRef — DOM access or persistent value (no re-render)
const ref = useRef<HTMLDivElement>(null);

// useContext — read shared data from a Provider
const value = useContext(MyContext);

// useReducer — complex state with actions
const [state, dispatch] = useReducer(reducer, initialState);

// useMemo — cache expensive calculations
const result = useMemo(() => expensiveCalc(a, b), [a, b]);

// useCallback — stable function reference
const fn = useCallback(() => doSomething(a), [a]);

// useId — unique ID for accessibility
const id = useId();

// useLayoutEffect — DOM measurements before paint
useLayoutEffect(() => {
  /* measure DOM */
}, [deps]);

// useTransition — mark update as non-urgent
const [isPending, startTransition] = useTransition();

// useDeferredValue — lagging value for heavy renders
const deferred = useDeferredValue(value);

// useImperativeHandle — expose methods on a child component
useImperativeHandle(ref, () => ({ focus, clear }));

// useActionState (React 19) — form actions with state
const [state, formAction, isPending] = useActionState(action, initialState);

// useOptimistic (React 19) — instant UI feedback
const [optimistic, addOptimistic] = useOptimistic(state, updater);

// use() (React 19) — read Promises or Context (can be conditional)
const data = use(somePromise);
const value = use(SomeContext);

// useFormStatus (React 19) — inside a form, reads submission state
const { pending } = useFormStatus();
```

---

## When to Use What — Decision Guide

```
Need to show changing data in the UI?
  └── useState ✅

Need to run code after render (API calls, subscriptions, timers)?
  └── useEffect ✅
       Need to run BEFORE paint (DOM measurements)?
         └── useLayoutEffect ✅

Need to access a DOM element directly?
  └── useRef ✅

Need a value that persists but doesn't cause re-renders?
  └── useRef ✅

Need to share data across many components?
  └── useContext ✅

Have multiple related state values with complex update logic?
  └── useReducer ✅

Have an expensive calculation running too often?
  └── useMemo ✅

Passing a function to a memoized child?
  └── useCallback ✅

Need a unique ID for an input/label pair?
  └── useId ✅

Have a slow update that's blocking the UI?
  └── useTransition ✅ (when you control the setter)
  └── useDeferredValue ✅ (when you don't control the setter)

Building a form in React 19?
  └── useActionState ✅ for form state
  └── useFormStatus ✅ for submit button inside the form
  └── useOptimistic ✅ for instant feedback before server confirms

Reading a Promise directly in a component?
  └── use() ✅ (wrap with Suspense!)

Logic repeated across multiple components?
  └── Custom hook ✅
```

---

> **Final tip for beginners:** Don't try to learn all of these at once. Start with `useState` and `useEffect` — those two cover 80% of what you'll need day to day. Add the others one by one as you encounter the problems they solve. That's how you'll actually remember them.
