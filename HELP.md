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
8. Video Adjust: Set/Increase/Decrease Red, Green, Blue Values
9. Video Adjust: Set/Increase/Decrease Luma Low/High Values
10. Video Adjust: Set/Increase/Decrease Chroma Low/High Values
11. Video Adjust: Set/Increase/Decrease Aspect Fill/Cb/Cr Values
12. Video Proc Amp: Set/Increase/Decrease Gain Value
13. Video Proc Amp: Set/Increase/Decrease Black Value
14. Video Proc Amp: Set/Increase/Decrease Saturation Value
15. Video Proc Amp: Set/Increase/Decrease Hue Value
16. Video Proc Amp: Set/Increase/Decrease RY/BY Values
17. Video Proc Amp: Set/Increase/Decrease Sharp Value

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
| $(teranex:video_adjust_red)              | Video Adjust: Red Value
| $(teranex:video_adjust_green)            | Video Adjust: Green Value
| $(teranex:video_adjust_blue)             | Video Adjust: Blue Value
| $(teranex:video_adjust_luma_low)         | Video Adjust: Luma Low Value
| $(teranex:video_adjust_luma_high)        | Video Adjust: Luma High Value
| $(teranex:video_adjust_chroma_low)       | Video Adjust: Chroma Low Value
| $(teranex:video_adjust_chroma_high)      | Video Adjust: Chroma High Value
| $(teranex:video_adjust_aspect_fill_luma) | Video Adjust: Aspect Fill Luma Value
| $(teranex:video_adjust_aspect_fill_cb)   | Video Adjust: Aspect Fill Cb Value
| $(teranex:video_adjust_aspect_fill_cr)   | Video Adjust: Aspect Fill Cr Value
| $(teranex:video_procamp_gain)            | Video Proc Amp: Gain Value
| $(teranex:video_procamp_black)           | Video Proc Amp: Black Value
| $(teranex:video_procamp_saturation)      | Video Proc Amp: Saturation Value
| $(teranex:video_procamp_hue)             | Video Proc Amp: Hue Value
| $(teranex:video_procamp_ry)              | Video Proc Amp: RY Value
| $(teranex:video_procamp_by)              | Video Proc Amp: BY Value
| $(teranex:video_procamp_sharp)           | Video Proc Amp: Sharp Value