# GengPropEditor

文本包装组件，双击文本后生成可输入的控件

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name         | Type      | Description | Default |
| ------------ | --------- | ----------- | ------- |
| `is-editing` | `boolean` | 编辑状态        | `false` |
| `input-val`  | `string`  | 输入值         | `""`    |

## Events

| Name                | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `update:input-val`  | <br/>**Arguments**<br/><ul><li>**`val: unknown`**</li></ul>  |
| `update:is-editing` | <br/>**Arguments**<br/><ul><li>**`true: boolean`**</li></ul> |
| `on-editing`        |                                                              |
| `confirm`           | &nbsp;                                                       |

## Methods

### handleUpdateVal()

更新值

**Syntax**

```typescript
handleUpdateVal(val: unknown): void
```

### handleDBClick()

双击事件

**Syntax**

```typescript
handleDBClick(): void
```

