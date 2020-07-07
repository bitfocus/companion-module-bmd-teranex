## Blackmagic Design Teranex

This module will connect to any Blackmagic Design Teranex device. Not all settings work with every model of Teranex. Where necessary, supported devices are indicated in the options.

**Actions**

1. Set video input
2. Set audio input
3. Recall preset
4. Test pattern
5. Output display
6. Output format
7. Variable aspect ratio

**Feedback**
1. Video input: Change background color
2. Audio input: Change background color
3. Signal is present

**Dynamic Variables**

| Variable                 | Description           | Current value |
|--------------------------|-----------------------|---------------|
| $(teranex:input_format)  | Input video format    | 1080p60       |
| $(teranex:video_input)   | Selected video input  | SDI 1         |
| $(teranex:audio_input)   | Selected audio input  | Embedded      |
| $(teranex:output_format) | Selected video output | 1080i59.94    |