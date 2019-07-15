## `himawari`: 基于`React Hooks Api`的响应式 React 状态管理库

### `himawari` 提供了什么

`himawari`最大的作用,就是让我们忘记繁杂的 api 文档,抛弃冗余的模板代码.只需要简单的**3**个 API,就能完成`redux` + `mobx`的功能.同时`himawari`由`typescript`编写,提供完整全面的类型推倒,让低级错误从此远离项目.

### 设计理念

`himawari`参考了`redux`和`mobx`的各自的一些理念和功能.和`redux`一样,`himawari`采用单`store`设计,但是`himawari`内部的数据和`mobx`一样全部是响应式的,在数据发生变动时,针对性的去刷新 UI,从而达到简洁且高效的目的.

### API

- `createStore`

  ```typescript
  createStore({ namespace: "test", ...initStore });
  ```

  作为创建`store`的 api,唯一的必填入参是全局唯一的`namespace`,除此之外,你可以传入任何类型的值.`himawari`内部维护着一个唯一`store`实例,每一个`createStore`方法调用后都会向实例中新增一个对象.

- `useStore`
  这个 API 使用了`react hooks`,所以请确保你的项目依赖的`react`版本大于 16.8.6,并且只可以在函数组件中调用它.方法会返回`Store`实例.当你修改他内部的值时,页面会自动重新渲染.

- `connect`
  对于类组件,无法使用`useStore`,那么可以使用`connect`方法,通过高阶组件的形式,包裹这个类组件.`connect`只有一个入参`mapState(store => f(store))`,作用和`react-redux`中的`connect`类似,但是需要注意的有三点:

  1. 不可以为`null`
  2. 返回值中不可以包含`store`对象.
     因为`store`对象的获取源于`useStore`这个方法,这个`hook`只能在函数组件中调用.
  3. `mapState`的结果将放在`this.props.$$store`中.

- `getStore`
  如果想在`Component`以外的地方获取`store`中的数据(不需要刷新 UI),直接`const store = getStore<T>()`即可.需要注意的是,修改`store`中的数据,也会刷新订阅了这些数据的组件.

### TODO

1. 补充测试文件
2. 增加 chrome 插件,在开发环境中直接查看/修改`stores`状态
3. 优化&&修 bug

### issues & PR

如果你对这个项目有任务的建议/想法,欢迎提 issue 或者发邮件给我(hejunqin233@gmail.com).

如果你想参与这个项目,欢迎提 pr.

如果你对这个项目感兴趣,不妨给个 star 鼓励一下.

蟹蟹,happy coding~~~
