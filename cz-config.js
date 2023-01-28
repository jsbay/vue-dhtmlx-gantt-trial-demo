module.exports = {
	types: [
		// { value: 'feat', name: 'feat:     A new feature' },
    // { value: 'fix', name: 'fix:      A bug fix' },
    // { value: 'docs', name: 'docs:     Documentation only changes' },
    // {
    //   value: 'style',
    //   name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    // },
    // {
    //   value: 'refactor',
    //   name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    // },
    // {
    //   value: 'perf',
    //   name: 'perf:     A code change that improves performance',
    // },
    // { value: 'test', name: 'test:     Adding missing tests' },
    // {
    //   value: 'chore',
    //   name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    // },
    // { value: 'revert', name: 'revert:   Revert to a commit' },
    // { value: 'WIP', name: 'WIP:      Work in progress' },

		{ value: 'feat', name: '🎖️   feat:       新增一个功能' },
		{ value: 'fix', name: '🐞  fix:        修复bug' },
		{ value: 'ui', name: '🤩  ui:         更新 UI(更新了页面UI,不影响功能)' },
		{ value: 'refactor', name: '🔨  refactor:   代码重构(既不是增加feature，也不是修复bug)' },
    { value: 'perf', name: '💥  perf:       改善性能' },
		{ value: 'docs', name: '📚  docs:       文档变更' },
		// { value: 'test', name: 'test:       测试' },
		{ value: 'chore', name: '🧰  chore:      构建流程或辅助工具或文档生成的变更' },
		{ value: 'style', name: '💅  style:      代码格式（不影响功能，例如空格、分号等格式修正）' },
		{ value: 'revert', name: '⏪  revert:     代码回退' },
    { value: 'release', name: '📣  release:    发布' },
		{ value: 'deploy', name: '💻  deploy:     部署' },
	],
	// 默认的范围池, 不指定的话, 就可以跳过选择 scopes 这一步了
	// 描述影响的范围
	scopes: [
		// { name: 'components' },
		// { name: 'utils' },
		// { name: 'styles' },
		// { name: 'deps' },
		{ name: 'other' },
	],
	// 设置后 scope 自动 增加 empty 和 custom 选项
	// 选择 custom, 则可以自己输入信息 
	allowCustomScopes: true,
	// 重大变化, type === 'feat' || type === 'fix', 才可能需要填写
	// 即使启动了, 也是可选的
	// allowBreakingChanges: ['feat', 'fix'], 
  // 消息步骤
  messages: {
    type: '选择提交类型:',
    scope: '选择修改范围(可选):',
		// 当 allowCustomScopes === true 时, 生效
		customScope: '输入修改范围(可选):',
    subject: '简要描述(必填):',
    body: '详细描述(可选):',
		breaking: '重大变化列表 (可选):',
    footer: '要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject 文字长度默认是72
  subjectLimit: 72
}