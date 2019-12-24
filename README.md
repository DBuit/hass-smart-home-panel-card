# Home assistant smart home panel card
Panel lovelace card


## Configuration

### Main Options

| Name | Type | Default | Supported options | Description |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entities` | string | **Required** | `entity: light.light` | List of entities |
| `title` | string | **Required** | `mdi:lightbulb` | Title shown in the left menu |
| `icon` | object | **Required** | `scenes:`  | Icon shown in the left menu |
| `countText` | string | optional | `lights on` | Text shown after the count of entities with an active state |
| `brightnessWidth` | string | optional | 150px | The width of the brightness slider |
| `brightnessHeight` | string | optional | 400px | The height of the brightness slider |
| `switchWidth` | string | optional | 150px | The width of the switch |
| `switchHeight` | string | optional | 400px | The height of the switch |

#example configuration
```
- type: "custom:custom-smart-home-panel-card"
  title: Test
  icon: mdi:floor-lamp
  entities:
    - entity: light.beganegrond
    - entity: light.voordeurlicht
```
