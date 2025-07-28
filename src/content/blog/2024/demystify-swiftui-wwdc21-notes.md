---
title: "Demystify SwiftUI WWDC21 - Notes"
description: "Key takeaways from WWDC21's Demystify SwiftUI session covering identity, lifetime, and dependencies in SwiftUI."
pubDatetime: 2024-03-18T00:00:00Z
tags: ["learning", "swiftui", "wwdc", "ios"]
---

**Reference:** [Demystify SwiftUI WWDC21](https://developer.apple.com/wwdc21/10022)

When SwiftUI looks at your code, it will look for three things:
- Identity
- Lifetime
- Dependencies

## Identity

**Explicit Identity**: In this case, `.dogTagID` represents the ID of the `rescueDog` data type which conforms to the `Identifiable` protocol.
- With a stable ID, SwiftUI can optimize performance.

![Explicit Identity](/assets/img/2024/swiftui/cleanshot-2024-03-18-000001.jpg)

**Implicit or Structural Identity**: If a statement or switch statement in a SwiftUI view's body (@ViewBuilder) creates an implicit ID based on structural differences (i.e., the position of the view relative to its hierarchy).

![Structural Identity](/assets/img/2024/swiftui/cleanshot-2024-03-18-000004@2x.jpg)

- Avoid using AnyView if possible.

![Avoid AnyView](/assets/img/2024/swiftui/cleanshot-2024-03-18-000005@2x.jpg)

## View Lifetime
- State Lifetime == View Lifetime, meaning when the view's identity changes, the state is destroyed along with that identity.

![View Lifetime](/assets/img/2024/swiftui/cleanshot-2024-03-18-000007@2x.jpg)

![View Modifier Identity](/assets/img/2024/swiftui/cleanshot-2024-03-18-000008@2x.jpg)

With this implementation, when `date < .now`, a different view modifier identity is created, which is not stable.

![Unstable Modifier](/assets/img/2024/swiftui/cleanshot-2024-03-18-000009@2x.jpg)

A better version would be to tie the condition in the value of opacity, so there is just a single **View Modifier**, which means better performance, more correct code, and SwiftUI is optimized for this kind of code.

![Better Implementation](/assets/img/2024/swiftui/cleanshot-2024-03-18-000010@2x.jpg)