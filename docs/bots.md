# bots

```js
tamtam.api.bots;
```

## Methods

### getInfo

Get bot info

```js
tamtam.api.bots.getInfo(); // => Promise<IBotsGetInfoResponse>
```

### editInfo

Edit bot info

```js
tamtam.api.bots.editInfo(params: IBotsEditInfoParams); // => Promise<IBotsEditInfoResponse>;
```

IBotsEditInfoParams:

| Key         | Required | Type                                              |
| ----------- | -------- | ------------------------------------------------- |
| name        | false    | string                                            |
| username    | false    | string                                            |
| description | false    | string                                            |
| commands    | false    | Array\<[IBotCommand](interfaces.md/#IBotCommand)> |
| photo       | false    | IPhoto                                            |
