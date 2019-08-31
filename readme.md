# Game Workshop 2019

Welcome to the Game Workshop (2019) for the [Idaho Falls Programmers][ifp] user group.

![Idaho Falls Programmers][ifp-logo]

## Intention

- Provide working knowledge of at least one game development technique in preparation for our October Game Jam.
- Avoid requiring an installed game development system (Unity, Unreal, etc).
- Target a cross OS platform for easy distribution/showcasing (modern web browsers).

![Game Example][example]

## Repo Structure

- Each branch is a snapshot at a feature delivery of this example game.
- Start with master and then move to each snapshot in order: `master` → `0001/asset-manager` → `0002/asset-manager`
    - _Note:_ at the live version we are going to program all this together without checking out these branches.

## Requirements

- A laptop if you are joining us at the live version of this workshop. We probably won't have room for a full PC setup.
- Updated web browser. This has been tested with [Google Chrome][gch] and [Mozilla Firefox][ffx] browsers.
- A code editor (or text editor) that you are comfortable with. [Visual Studio Code][vsc] works well enough and is free and cross platform.
- A local web server program (avoids possible problems with asset delivery to the browser)

### Possible Local Servers

| Server | Command |
| ------ | ------- |
| [Caddy Web Server][cdy] | `caddy` |
| [Python Built-in][pyn] | `python -m SimpleHTTPServer 8080` |
| [PHP Built-in][php] | `php -S localhost:8080` |

# Credits
- [Liberated Pixel Cup][lpc]
    - art assets
- Nelson James Gatlin
    - torvald.ogg
- Johnathan Roatch
    - metal-switch.ogg
    - vocal-percussion-8.ogg
    - metal-bowl.ogg
    - metal-bowl-with-water.ogg
- Photonstorm
    - plasmaball.png

[ifp]: https://www.meetup.com/IFProgrammers/ "Idaho Falls Programmers"
[gch]: https://www.google.com/chrome/ "Google Chrome"
[ffx]: https://www.mozilla.org/en-US/firefox/ "Mozilla Firefox"
[vsc]: https://code.visualstudio.com/ "Visual Studio Code"
[php]: https://www.php.net/manual/en/features.commandline.webserver.php "PHP Built-in Web Server"
[pyn]: https://docs.python.org/2/library/simplehttpserver.html "Python Simple HTTP Server"
[cdy]: https://caddyserver.com/tutorial "Caddy Web Server"
[lpc]: http://lpc.opengameart.org/static/lpc-style-guide/ "Liberated Pixel Art"

[ifp-logo]: http://i.critrussell.net/assets/efLGNJdbJK.png "IFP Logo"
[example]: http://i.critrussell.net/ewJvfwfW.png "Screenshot"
