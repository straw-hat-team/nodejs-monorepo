# `shc plugins`

list installed plugins

- [`shc plugins`](#shc-plugins)
- [`shc plugins:install PLUGIN...`](#shc-pluginsinstall-plugin)
- [`shc plugins:link PLUGIN`](#shc-pluginslink-plugin)
- [`shc plugins:uninstall PLUGIN...`](#shc-pluginsuninstall-plugin)
- [`shc plugins:update`](#shc-pluginsupdate)

## `shc plugins`

list installed plugins

```
USAGE
  $ shc plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ shc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/index.ts)_

## `shc plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ shc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ shc plugins:add

EXAMPLES
  $ shc plugins:install myplugin
  $ shc plugins:install https://github.com/someuser/someplugin
  $ shc plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/install.ts)_

## `shc plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ shc plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ shc plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/link.ts)_

## `shc plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ shc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ shc plugins:unlink
  $ shc plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/uninstall.ts)_

## `shc plugins:update`

update installed plugins

```
USAGE
  $ shc plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/update.ts)_
