## {{name}}

> {{description}}

### 属性

{{#each props}}

#### {{propName}}

> {{description}}

```shell
{{{raw}}}
```

{{/each}}

### 函数

{{#each methods}}

#### {{raw}} 

> {{description}} 

##### 参数

{{#each params}}
- val
{{/each}}

---

{{/each}}
