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
| `showButton` | string | optional | "show" | Use show to display a button in the left sidebar |
| `buttonText` | string | optional | "Home" | Set the text in the button |
| `buttonPath` | string | optional | "/lovelace/0" | Set the path you wan't the page to navigate to when clicking the button |

#example configuration
```
- type: "custom:custom-smart-home-panel-card"
  title: Test
  icon: mdi:floor-lamp
  showButton: "show"
  buttonText: "Test"
  buttonPath: "/lovelace/0"
  entities:
    - entity: light.beganegrond
    - entity: light.voordeurlicht
```
