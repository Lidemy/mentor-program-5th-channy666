## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### `useState`

用於儲存狀態、改變狀態。  
例如：`const [name, setName] = useState('John')`  
`name`: 一個名稱為 name 的狀態  
`setName`: 用來更新 name 的狀態的 function  
`John`: useState function 裡面傳該 state 的初始值。

React 的畫面是跟狀態（或說資料）綁再一起的，也就是狀態改變的時候就會觸發 re-render，讓呈現的畫面與當前最新的資料保持一致。state 則是用來紀錄（儲存）畫面上必要的資料（且用相同的資料可以完整地將畫面還原），若是可以經由現有的 state 做組合、計算得出的資料則不建議再用另一個 state 來儲存。

state 有 immutable 的特性，不應該直接更動 state 的值，而是產生出一個新的 state 然後用 setState 來更新 state。
例如當 state 是一個陣列，就不應該用 `.push()` 的方式直接改動 state，而是用解構等等可以產生出一個新的陣列的方法，產生出新的陣列後透過 setState 來更新。

關於 state 的更新，除了直接更新 state 的內容，也可以使用 functional update 的方式
，就是在 setName() 裡面用 function 來更新 state。
`setName(prevState => {...})`
function 的參數 (prevState) 就是前一個 state 的值，就可以透過這個參數來更新 state。
當新的 state 與前一個 state 有關的時候，用 functional update 可以確保每一次都是正確的更新（從當前最新的 state 往下更新）

另外，state 更新的時候，react 會比較更新前後的值，如果是一樣的就會跳過不更新（也就不會觸發 re-render）。
所以如果 state 是一個 object，且更新時直接改變 state 的值（而非產生新的 object 再用 setState 更新），對 React 來說，雖然值改變了但該 state 還是指向同一個記憶體位置沒有改變，所以是會跳過不更新的。

由於每一次 render 都會執行一次 useState 的初始化，當 state 的初始值需要經過很複雜的運算或操作時，useState 初始值可以傳入一個 function，這個 function return 的就是 state 的初始值，並且該 function 只會在第一次 render 的時候被執行（後續的 re-render 就不會）

### `useEffect`、`useLayoutEffect`

處理 render 時的 side effect 的時候用的，例如拿 API 資料、設定登入狀態等等不一定每次 render 都需要再執行一次的事情。useEffect 是在 component render、paint 完後執行的，可以讓這些 side effect 不會去影響到網頁的載入與畫面的呈現。

儘管 useEffect 是在 render 與 paint 完後才執行，react 會確保該 useEffect 會在下一次的 render 之前被執行，就是每一個 render 都有自己的 useEffect（若是有 dependency，則是依據 dependency 有沒有改變而定）。

useEffect 的第一個參數是一個 function，第二個參數是一個陣列。預設是每一次 render、paint 完都會執行 useEffect 第一個參數的 function，如果只有在特定時候才需要執行 useEffect（通常是與 function 相關的東西有變的時候），可以在第二個參數的陣列裡加上 useEffect 的 dependency，在每次 render 時，react 會先檢查 dependency 有沒有改變，有改變才會再執行一次 useEffect。若是希望 useEffect 只在第一次 render 的時候執行，第二個參數的陣列維持空白，等於是 dependency 都一直沒有變，在後續 re-render 的時候就不會再觸發 useEffect。

useEffect 還有一個 clean-up function，就是 useEffect 第一個參數的 function return 的 function。clean-up function 執行的時機有兩個，在下一次 useEffect function 要執行之前會先執行這一次 useEffect 的 clean-up function，例如 count 是 useEffect 的 dependency，使用者讓 count 從 1 變成 2，因為 dependency 改變，會執行 useEffect，順序如下：

1. count 由 1 變成 2，觸發 re-render
2. 執行前一個 effect 的 clean-up function （count: 1 時的 useEffect 的 cleanup function）
3. 執行 useEffect （當前 count: 2）

還有另外一個會執行 clean-up function 的時機就是 component 要 unmount 之前。clean-up function 也可以用來清除 component 相關的資料，確保 unmount 之後不會有舊的或不該留下的資料存在。

而 `useLayoutEffect` 基本上使用方式與 useEffect 一樣，只是 useLayoutEffect 會在 render 完、paint 之前先執行。
例如 conponent render 前需要先拿到跟畫面相關的資料，使用 useLayoutEffect 就可以在 browser paint 之前先把資料塞進去，這樣畫面就會直接顯示新的資料。

### `useContext`

對於 component 間共通的狀態或是資料，若是用 props 來傳遞，就會造成 props drilling 的問題，一層一層都要接收與傳遞資料，component 本身不一定會用到但還是要幫傳，尤其若需要傳遞的資料過多又會造成更大的負擔，這時候就適合使用 useContext 來傳遞。

使用方式：

1. createContext(): 宣告一個 context，裡面  傳 context 的初始值，例如 `const ThemeContext = createContext()`

2. 在要提供 context 給 children 的 component 外包一層 context provider，例如 `<ThemeContext.Provider value={[theme, setTheme]}> ... </ThemeContext.Provider>`

3. context provider 標籤裡面的 value 屬性就是 usecontext 傳遞的資料，資料類型沒有限制，value 傳什麼，useContext 就可以拿到什麼。

4. 需要使用到 context 的 conponent 再呼叫 useContext 把資料拿出來，例如 `const [ theme, setTheme] = useContext(ThemeContext)` （useContext 裡面要傳 createContext 宣吿的那個 context）

另外，context 內容改變，context Provider 底下的 component 也都會 re-render。可以利用 memo（component 接收的 props 沒有變，就會跳過 re-render 直接用上一次 render 的結果）來防止不必要的 render。建議在有很多 component 共通、且不需要頻繁改變的資料上使用 useContext，例如 user 登入的狀態、畫面主題樣式、使用的語言等等。

### `useReducer`

跟 useState 一樣都是可以保存、處理狀態（資料）的 hooks。useState 包含 state 本身以及 setState 這個用來改變 state 的 function，而 useReducer 則是除了 state 本身以外，還多了兩個處理 state 的 function，分別為接收 action （可能包含 type、payload）的 dispatch，以及根據接收到的 action 來處理 state 的 reducer。（自己亂記的方法是 dispatch function 用來呼叫 useReducer 且接收指令，reducer function 就會根據指令來處理資料）

當資料較複雜、可能需要多個 state 來儲存、且 state 之間有相關的時候，或是資料需要經過複雜處理的時候，使用 useReducer 就可以簡單的以一個 reducer function 來把處理資料的邏輯分離出來，用 action 來區分不同的處理方式，讓程式碼更簡便易讀。而且 dispatch function 不會因為 re-render 而改變，所以不需要放到 useCallback、useEffect 等的 dependency 裡，經由 props 往下傳也不會造成底下 component 的 re-render。

以 week21 五子棋作業為例，需要儲存的資料有步數、下的旗子（黑或白）、當前顯示的棋盤狀態以及歷史紀錄，預計會有的動作有下棋、跳到某個步數繼續下棋（原先該步數之後的記錄都刪除，從該步數繼續下），還有重新開始

```javascript
const initalGame = {
  currrentStep: 0,
  isBlackPlayerNext: true,
  board: [...],
  history: []
}

const [game, dispatch] = useReducer(reducer, initialGame)

const reducer = (state, action) => {
  switch (action.type) {
    case 'move':
      return {
        ...state,
        currentStep: state.currentStep + 1,
        isBlackPlayerNext: !state.isBlackPlayerNext,
        board: [...], /* 用action.payload.position 更新棋盤 */
        history: [
          ...state.history,
          state.board,
        ]
      }
    case 'jumpToStep':
      const { step } = action.payload
      return {
        ...state,
        currentStep: step,
        isBlackPlayerNext: step % 2 === 1,
        board: state.history[step - 1],
        history: state.history.slice(0, step - 1)
      }
    case 'restart':
      return {...initialGame}
  }
}

// 假設點擊棋盤可以拿到該棋格的座標位置
const handleBoardClick = (row, column) => {
  dispatch({
    type: 'move',
    payload: {position: [row, column]}
  })
}

// 假設點擊步數可以拿到該步數的數字
const handleJumpToStep = (step) => {
  dispatch({
    type: 'jumpToStep',
    payload: {step},
  })
}

// 點擊重新開始按鈕
const handleClickRestart = () => {
  dispatch({
    type: 'restart'
  })
}

```

(寫了之後覺得例子舉的不是很恰當（也有一些邏輯部分也需要修正），還是要根據實際使用的情形再決定要用 useState 或是 useReducer）

### `useCallback`、`useMemo`

useCallback 與 useMemo 都是用來記住東西的，兩者接收的第一個參數都是一個 function，第二個參數則是一個 dependency 陣列，每次 re-render 時，react 都會先比較陣列中的 dependencies 有沒有改變，都沒有變的話就會繼續記得上一次 render 記住的東西（不會重新宣告或重新執行第一個參數的 function）。

而兩者的差別在於，useCallback 記住的是第一個參數的 function 本身，dependency 改變時才會重新宣告、建立，產生一個新的 function instance。當 function 需要作為 props 傳給 children component 時，被記住、沒有改變的 function 就不會造成 children 不必要的 re-render。  
useMemo 記住的是第一個參數的 function 回傳的值，function 本身是會跟著 component 的 render 而重新宣告的，只是當 dependency 有改變時才會去執行 function 拿到 function return 的新的值（ dependency 沒變的話就是繼續記住上一次舊的值），不需要每一次 render 都重新執行一次 function，適合在執行該 function 需要經過長時間運算或是花費較大效能的時後使用。

但是也不是所有的 function 都用 useCallback、useMemo 包起來最好，react 在比較 dependency 時也是需要耗費一定的效能，對於經常改變的 dependencies 反而達不到最初使用 useCallback、useMemo 想要的優化效果。

### `useRef`

useRef 會回傳一個有 current 屬性的 object，useRef 接收的參數即為 current 的初始值。current 可以用來存放各種資料、甚至是指向一個 Dom 元素。useRef 的內容改變時並不會觸發 component re-render，且本身也不會因為 component re-render 而被重新創造（current 的 value 可能改變，但依舊是指向同一個 reference）。
通常用於儲存不會影響畫面的資料（資料的更新與是否需要 re-render 無關）的時候，例如計算 render 的次數、紀錄前一次 render 的資料等等。

例如 `const count = useRef(0)`，0 即為 count 的初始值，此時 count.current 就是 0，若將 count.current 的值更新為 1，也不會造成 component re-render。

useRef 也可以用來指向 DOM 元素，將元素的 ref 屬性指定為 useRef，例如 `const inputRef = useRef()` `<Content ref={inputRef}/>` 此時 inputRef.current 即為 `<Content>`，可以直接操縱這個 DOM 元素。

### `useImperativeHandle`

搭配 useRef 與 forwardRef，將子元素的資料 expose 給父元素。（感覺跟用 props 傳東西下去的方式一樣，只是方向相反？）

先使用 useRef 指向父元素，延續上方 useRef 的例子 `<Content ref={inputRef} />`

Content 元素則以 forwardRef 將 ref 轉交給底下的子元素，並使用 useImperativeHandle 來接收 ref。
useImperativeHandle 除了第一個參數的 ref，還有第二個參數，用來自己定義要往上 expose 的東西，以及第三個參數 dependency array。例如要將 Content 元素內的各項 input 子元素的 value 往上到 expose 到 Content。

```JSX
const Content = forwardRef(props, ref) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useImperativeHandle((ref, () => ({
    value: {
      title,
      body,
    }
  }), [title, body]))

  // ...其他處理

  return (
    <ContentContainer>
      <input name="title" value={title} />
      <input name="body" value={body} />
    </ContentContainer>
  )
}
```

此時在父層的 inputRef.current 的內容就會是 Content 內 useImperativeHandle 我們自訂的第二個參數（例如可以用 inputRef.current.value.title 來取得 Content 裡面的 title 這個 state 的值），這樣就可以在父層處理子層的資料，資料不需要存在父層，就不會因為資料改變而觸發整個父層 re-render。

### `useDebugValue`

在 costom hook 中使用，可以在 react dev tools 印出一些資訊的 hook。useDebugValue 會在 dev tools 印出接收到的第一個參數，通常會印出 state 或是 custom hook 當前狀態等等可以明確、快速了解目前狀況的資訊。一個 custom hook 內也可以使用多個 useDebugValue，在 dev tools 中會集合起來變成一個陣列呈現。

useDebugValue 主要就是幫助 custom hooks 的開發者或 custom hooks 的使用者在 dev tools 中看到 custom hooks 相關的資訊，純粹用於開發（與“使用該 custom hook 的 application“ 無關。若分為開發 custom hook 的開發者、使用 custom hook 開發 application 的使用者、以及使用 application 的消費者三個方面，useDebugValue 就是與消費者無關）。若是擔心 useDebugValue 影響效能（消費者部分），可以在 useDebugValue 傳入一個 function 作為第二個參數，該 function 只有在開啟 dev tool 狀態時才會被呼叫，function 會接收 useDebugValue 的第一個參數，而 useDebugValue 則會印出該 function return 的東西。

### `useDeferredValue`

useDeferredValue 可以把一個資料複製另一份，但是是隔一段時間後才處理複製的資料。例如有一筆資料需要顯示在畫面的 A、B 兩個不同的位置，A 位置在畫面的正中間，且只需要（可以較快速取得的）資料的一小部分，而 B 在畫面下方邊邊的位置，且需要顯示整個完整的資料。

此時 B 位置就適合用延遲過後的資料 `const deferredData = useDeferredValue(data)`

先處理完比較重要的 A 之後再去處理使用延遲後資料(`deferredData`) 的 B，就不會因為同時處理 A、B 兩處而出現較長的延遲，或是發生資料卡來卡去的狀況，讓使用者體驗變差。

useDeferredValue 的第一個參數就是需要被（延遲）複製的資料(上面的例子就是 `data`)，自己覺得（不知道正不正確）比較像是幫需要處理的事情排一下順序，以上面的例子來說就是 B 比較不重要，先做 A 再來做 B。

若加入第二個參數可以自訂最長延遲時間 `const deferredData = useDeferredValue(data, { timeoutMs: 1000 })`，先 A 後 B，但是不管 A 做完沒，一秒後就開始處理 B。

### `useTransition`

`const [isPending, startTransition] = useTransition()`

與 useDeferredValue 類似 ，都是關於資料更新、render 的重要程度，決定 react 做事情的先後順序。

第二個參數會接收一個 callback function，例如 `startTransition(() => setData(...))`，通常就是比較不重要、更新順序放後面、延遲一點沒關係的 state 更新，react 就會先把資源用來處理其他重要的東西，之後再來處理延遲的 data 更新。

而第一個 isPending 參數是一個布林值，會顯示當前是否處於 transition 階段（startTransition 裡面的事情正在延遲中），可以依據 isPending 的狀態來更新畫面，例如 isPending 為 true 時，data 的更新正在延遲中，畫面就顯示 Loading 字樣等等。以前 Loading 狀態都是再做一個 isLoading 的 state 來存，若直接用 isPending 來判斷應該可以更即時的追蹤 transition 的狀態，使用者感受度會更好。

跟 useDeferredValue 一樣，useTransition 也可以自訂延遲的時間 `const [isPending, startTransition] = useTransition({ timeoutMs: 1000 })`

### `useId`

useId 會產生一個獨特（在全域中不會重複）的字串，代表該元素在 DOM Tree 的層級結構，可以作為 component 的 id 屬性。

（這邊好像還跟 Suspense 相關，目前還沒有瞭解得很透徹，大概的認識是 React server-side rendering 是先由 server render 出 HTML 的部分，讓使用者可以先看到一些網頁的架構，等 client 端讀取完 javascript 之後再把 UX 部分 hydrate 到已經 render 完的 HTML 上面。若加上 `<Suspense>` 就可以改變處理 component 的順序（concurrent rendering），需要等待資料回來、要處理比較久的 component 就可以先暫停（或顯示為 loading 之類的），其他優先 render、hydrate 完的 component 就可以先顯示出來與使用者互動。不用照順序的 render 整個 HTML 然後再讀取整包 javascript，而是可以把 component 拆開成獨立的單位來處理，順序可以自己決定、也可以暫停去處理別的東西，就不會互相拖累，先好的就先出，在 render 的同時也可以依據使用者點擊畫面等互動做即時反應。）

因為處理 component 不一定會依照順序，若是使用自己隨機生成的數字或是其他自訂的 counter 為 id，可能會使同一個 component 在 server side 與 client side 產生不同的 id

使用 useId 會確保 component 的 id 不重複且保持穩定不變（server 跟 client side 會一致）。若在 component 內需要使用不同的 id（例如 form 裡面多個 input 的 id），因為 useId 產生的是一個字串，可以以該 component 的 id 再加上其他字串來辨別（例如 `${useId}-nickname`、`${useId}-email`），因為 useId 不會重複，不同 input 也是加上不同的字串，加起來還是一個獨一且穩定的 id。

不過 list 的 key 屬性就不適合用 useId，key 應該要與 list 的內容相關（或從內容中產生）比較合適。

### `useSyncExternalStore`

因為 react 的 concurrent rendering，可能因為各種原因（startTransition、useDeferredValue、使用者點擊畫面等等）使得 component render 的過程暫停或延後，此時若與 component 相關的外部資料在 render 暫停或延後的期間更新，可能會導致暫停前後 render 出來的畫面不一致（tearing）。useSyncExternalStore 則是用於避免 tearing 的狀況。

`const state = useSyncExternalStore(subscribe, getSnapshot)`
第一個參數 subscribe 是一個 function，在外部資料改變時會被呼叫。
第二個參數 getSnapshot function，會回傳外部資料的值，也是 useSyncExternalStore 回傳的值（state）

getSnapshot 回傳的必須是一個 cashed value，除非外部資料有變，不然都應該回傳一樣的值。在 render 跟 hydration 階段都會使用這個值，確保畫面前後一致。

（這部分的 subscribe 跟 unsubscribe 還沒有很懂，先筆記一下。）

### `useInsertionEffect`

類似 useEffect，但時無法取得 ref 指向的 DOM node 也無法安排更新。useInsertionEffect 會在 DOM 變動前觸發，通常只用於 useLayoutEffect 讀取 layout 之前插入或刪除 css styles。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

class component 的一生會有三種階段，mount（component 出生）、update（component 更新）、以及 unmount（component 死亡），各個階段都有一些 method 在不同時間點幫助 component 準確表現出我們想要的樣子。

### mount(component 出生)

1. constructor: component 出生時，會接收從 parent 那邊繼承的 props，通常會先 call `super(props)` 讓 component 可以取得 props，同時也會做 state 的初始化。

2. getDerivedStateFromProps: render 前執行，接收 props 跟 state 兩個參數，若 state 有更新則 return 一個更新 state 的 object，不更新則 return null。通常用於 state 更新與 props 相關的時候。

3. render: 根據更新後的 state 或 props 把新的 HTML 放到 DOM 上面，每次 state 或是 props 更新時都會執行一次。render 也是 component 生命中唯一必要的 method。

4. componentDidMount: render 完之後會執行，此時 component 已經存在於 DOM 上面，可以操作 DOM 元素。

### update(props 或是 state 改變，使 component 更新)

1. getDerivedStateFromProps: 在 render 前執行（包含 mount 階段），接收 props 跟 state，會 return 一個更新 state 的 object 或是 null。

2. shouldComponentUpdate: 也是在 render 之前執行，雖然 props 或 state 改變就會觸發 update 的程序，但有時候不一定需要 re-render。shouldComponentUpdate 會接收新的 props 跟新的 state，可以用來判斷是否要 update(re-render)，並 return 一個布林值（預設為 true），true 就表示要 update、false 就不要 update（也就是底下 render、getSnapshotBeforeUpdate、componentDidUpdate 都不會執行）。

3. render: 把更新過 props、state 的 HTML 放到 DOM 上。

4. getSnapshotBeforeUpdate: 在 render 之後、更新 DOM 之前執行，可以接收到 component update 之前的 props 跟 state，return 的值會被傳進 componentDidUpdate 的第三個參數。

5. componentDidUpdate: component update 完後執行，接收的參數包含更新前的 props、更新前的 state，以及 getSnapshotBeforeUpdate return 的值（如果沒有執行 getSnapshotBeforeUpdate 則為 undefined）。
   component 第一次 render 是 mount 不是 update，所以不會執行 componentDidUpdate。

### Unmount(component 死亡)

1. componentWillUnmount: component 要從 DOM 上面移除時執行。通常用於清除一些 component 相關的資訊、timer、subscription 等。

### Error handling(children 出現錯誤時)

當 component 的 children 拋出錯誤時（包含 constructor、render 等等各 lifecycle method 拋出的錯誤）就會被抓到，可以做一些錯誤時的處置，避免被 children 的錯誤影響

1. static getDerivedStateFromError(): 接收 children 丟出的錯誤，return 一個更新 state 的值，例如 state 其中一項是 `hasError: false`，當 hasError 為 true 時就可以做一些錯誤處理。
2. componentDidCatch: 會接收到 error（拋出的錯誤）以及 info（包含拋出錯誤的 children 的資訊） 兩個參數，可以用於紀錄錯誤的詳細資訊。

## 請問 class component 與 function component 的差別是什麼？

### class component

使用 class component 需要 `extends React.Component` 代表這是一個 react 的 component。class component 的不同時期（lifecycle）有不同的 method 來操縱 component，包含一開始初始化 component 的 constructor（`super(props)` 來拿到 props、初始化 state）、component update 前後的 shouldComponentUpdate 和 componentDidUpdate (可以用來做一些檢查或是 call API 之類的）、以及 component unmount 前清除資料等等。另外還有一定要有的 render method，裡面會 return react 元素（通常為 JSX 語法）。

在 class component 裡面不管是要更新 state、拿到 props 或是使用裡面的 method，都時常需要用到 `this` 來指向現在這個 component instance。而 this 會因為呼叫的方式或是呼叫的時機點而不同，需要比較多關於 `this` 的知識。

### function component

function component 就是一個 function，可以接收 props（function 的參數），並且直接 return react 元素。
對 function component 來說，每一次的 render 都有自己的 props、state 或是 compnent 裡面的 function（儲存在該次 render 的作用域中），相較於 class component 需要用 `this` ，function component 閉包的特性寫起來較方便直覺。

function component 內部並沒有 lifecycle method 可以用，而是用 hooks（可使用 react 內建的或是 custom hook），在操作上比較聚焦在資料的儲存與改變，以及每一次 render 後要做的事情。包含與資料相關的 useState、同時包辦 render 完跟 component unmount 前會執行的 useEffect，甚至還有跳脫 render 的 useRef。與 class component 關注各個 lifecycle 要做什麼的方式比較不一樣。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

通常是在 component 有包含與使用者互動的資料的時候使用，例如表單中的 `<input>`、`<textarea>`、`<select>`。

### controlled component

react 控制下的 component，使用者輸入的資料儲存在 state 裡面，有任何的改變都會在 react 的掌控之中。使用者輸入的資料（component 顯示的資料）以及 state 裡面儲存的資料，都是同步（保持一致）的。因為使用者的輸入有任何改變，state 也會跟著變，雖會觸發 component 較頻繁的 re-render，但同時也可以更即時的對資料做出反應（例如隨時判斷輸入的資料格式，不正確就跳錯或是讓表單無法送出），互動性比較高。

```JSX
// 新增 name 這個 state，因為是 controlled component，如果預設值設 null 會跳錯，還沒有確定是什麼原因，目前先想像是 input value 預設是 null 等於不存在，這樣就不算是在 controll 之下了...?
const [name, setName] = useState('')

// 隨時追蹤資料的變化，有變化馬上更新 state
const handleInputChange = (e) => {
  setName(e.target.value)
}

// input 的 value 就是當前的 state（最新的資料）
<input value={name} onChange={handleInputChange}/>
```

### uncontrolled component

沒有被 react 控制的 component，使用者輸入的資料存在 DOM 上面，使用者輸入的資料有任何的更動 react 都不會有什麼反應。通常只會用 ref 來指向 component 本身，當需要拿到資料時再利用 `ref.current.value` 來取得。雖然沒辦法追蹤資料的變化，但不會造成 compnent 太頻繁的 re-render。

```JSX
// 使用與 render 無關（不會造成 component re-render）的 ref
const inputRef = useRef()

// 拿到 input 的 value
const getInputValue = () => {
  return inputRef.current.value
}

// 讓 ref 指向 input，ref 的 .current 屬性就會是 input 這個 instance
<input ref={inputRef} />
```
