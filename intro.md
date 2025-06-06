---
outline: 'deep'
---


# What is accessibility?

Accessibility is the practice of making your websites usable by as many people as possible. We traditionally think of this as being about people with disabilities, but the practice of making sites accessible also benefits other groups such as those using mobile devices, or those with slow network connections.

You might also think of accessibility as treating everyone the same, and giving them equal opportunities, no matter what their ability or circumstances. Just as it is wrong to exclude someone from a physical building because they are in a wheelchair (modern public buildings generally have wheelchair ramps or elevators), it is also not right to exclude someone from a website because they have a visual impairment. We are all different, but we are all human, and therefore have the same human rights.

Accessibility is the right thing to do. Providing accessible sites is part of the law in some countries, which can open up some significant markets that otherwise would not be able to use your services or buy your products.

There are 3 levels of disabilities:
- permanent disablilties
<!-- People who are deaf or hard of hearing, People who are blind or low vision using screen reader. People with auditory processing difficulties. -->
- temporary disabilities
 <!-- Have you ever go to the optometrist and they dilate your eyes and everythin is very washed out. You have hard time seeing until the medication wears off, that's a temporary type of disability. -->
- situational disabilities
<!--youre on the bus and want to watch a video-->

## What kinds of disability are we looking at?

People with disabilities are just as diverse as people without disabilities, and so are their disabilities. The key lesson here is to think beyond your own computer and how you use the web, and start learning about how others use it — you are not your users. The main types of disability to consider are explained below, along with any special tools they use to access web content (known as assistive technologies, or ATs).

::: info Note

The World Health Organization's [Disability and health](https://www.who.int/en/news-room/fact-sheets/detail/disability-and-health) fact sheet states that "Over a billion people, about 15% of the world's population, have some form of disability", and "Between 110 million and 190 million adults have significant difficulties in functioning."
:::

### People with visual impairments

People with visual impairments include people with blindness, low-level vision, and color blindness. Many people with visual impairments use screen magnifiers that are either physical magnifiers or software zoom capabilities. Most browsers and operating systems these days have zoom capabilities. Some users will rely on screen readers, which is software that reads digital text aloud.


### People with hearing impairments

[Deaf and hard-of-hearing (DHH)](https://www.nad.org/resources/american-sign-language/community-and-culture-frequently-asked-questions/) people have various levels of hearing loss ranging from mild to profound. Although some do use AT (see [Assistive Devices for People with Hearing, Voice, Speech, or Language Disorders](https://www.nidcd.nih.gov/health/assistive-devices-people-hearing-voice-speech-or-language-disorders)), they are not widespread.

To provide access, textual alternatives must be provided. Videos should be manually captioned, and transcripts should be provided for audio content. Furthermore, due to high levels of [language deprivation](https://epicspecialeducationstaffing.com/language-deprivation/#:~:text=Language%20deprivation%20is%20the%20term,therefore%20not%20exposed%20to%20language.) in DHH populations, [text simplification should be considered](https://circlcenter.org/collaborative-research-automatic-text-simplification-and-reading-assistance-to-support-self-directed-learning-by-deaf-and-hard-of-hearing-computing-workers/).

Deaf and hard-of-hearing people also represent a significant userbase — "466 million people worldwide have disabling hearing loss", says the World Health Organization's [Deafness and hearing loss](https://www.who.int/en/news-room/fact-sheets/detail/deafness-and-hearing-loss) fact sheet.

### People with mobility impairments

These people have disabilities concerning movement, which might involve purely physical issues (such as loss of limb or paralysis), or neurological/genetic disorders that lead to weakness or loss of control in limbs. Some people might have difficulty making the exact hand movements required to use a mouse, while others might be more severely affected, perhaps being significantly paralyzed to the point where they need to use a [head pointer](https://www.performancehealth.com/adjustable-headpointer) to interact with computers.

This kind of disability can also be a result of old age, rather than any specific trauma or condition, and it could also result from hardware limitations — some users might not have a mouse.

The way this usually affects web development work is the requirement that controls be accessible by the keyboard — we'll discuss keyboard accessibility in later articles in the module, but it is a good idea to try out some websites using just the keyboard to see how you get on. Can you use the Tab key to move between the different controls of a web form, for example? You can find more details about keyboard controls in our [Use semantic UI controls where possible](/en-US/docs/Learn_web_development/Core/Accessibility/HTML#use_semantic_ui_controls_where_possible) section.

In terms of statistics, a significant number of people have mobility impairments. The US Centers for Disease Control and Prevention [Disability and Functioning (Non-institutionalized Adults 18 Years and Over)](https://www.cdc.gov/nchs/fastats/disability.htm) reports the USA "Percent of adults with any physical functioning difficulty: 16.1%".

### People with cognitive impairments

Cognitive impairment refers to a broad range of disabilities, from people with intellectual disabilities who have the most-limited capabilities, to all of us as we age and have difficulty thinking and remembering. The range includes people with mental illnesses, such as [depression](https://www.nimh.nih.gov/health/topics/depression) and [schizophrenia](https://www.nimh.nih.gov/health/topics/schizophrenia). It also includes people with learning disabilities, such as [dyslexia](https://www.nichd.nih.gov/health/topics/learningdisabilities) and [attention deficit hyperactivity disorder](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd). Importantly, though there is a lot of diversity within clinical definitions of cognitive impairments, people with them experience a common set of functional problems. These include difficulty with understanding content, remembering how to complete tasks, and confusion caused by inconsistent webpage layouts.

A good foundation of accessibility for people with cognitive impairments includes:

- Delivering content in more than one way, such as by text-to-speech or by video.
- Easily understood content, such as text written using plain-language standards.
- Focusing attention on important content.
- Minimizing distractions, such as unnecessary content or advertisements.
- Consistent webpage layout and navigation.
- Familiar elements, such as underlined links blue when not visited and purple when visited.
- Dividing processes into logical, essential steps with progress indicators.
- Website authentication as easy as possible without compromising security.
- Making forms easy to complete, such as with clear error messages and simple error recovery.

