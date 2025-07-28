---
title: "Data Essential in SwiftUI - 2020"
description: "Notes from WWDC 2020's Data Essentials in SwiftUI session covering @State, @Binding, ObservableObject, and data lifecycle."
pubDatetime: 2024-03-18T00:00:00Z
tags: ["learning", "swiftui", "wwdc", "ios"]
---

**Reference:** [Data Essential in SwiftUI - 2020](https://developer.apple.com/wwdc20/10040)

## State and Binding
- @State create a new source of truth
- @Binding create a reference to the source of truth allow write access to that state

![State-Binding](/assets/img/2024/swiftui/state-binding.png)

## Performance Considerations
Avoid Repeated Heap allocation problem by using @StateObject appropriately.

![Repeated Heap Allocation](/assets/img/2024/swiftui/repeated-heap-allocation.png)

![StateObject Example](/assets/img/2024/swiftui/stateobject-example.png)

## ObservableObject
- `@ObservableObject` allow multiple SwiftUI view to `subscribe` to its changes (specifically before the property will change)
- ObservableObject protocol is for class (reference type only), which mean it will be kept alive in the memory if there is reference to it
- Class follow this protocol will usually need to have @Published property that will trigger event that ties to SwiftUI view updates
- ObservableObject can be used to provide a single source of truth through view / app hierarchy
- @Published can be used to mark property can be observed or bound to (Binding)

![Observable Object Publish](/assets/img/2024/swiftui/observable-object-publish.jpg)

ObservableObject can be used to provide a single source of truth through view / app hierarchy, either as a single Instance (one object) or multiple instances.

![Observable Object](/assets/img/2024/swiftui/observable-object.jpg)

## Three Ways to Subscribe to ObservableObjects
There are 3 ways that View can subscribe to changes of @ObservableObjects:
- **@ObservedObject**: The life cycle of the observed object is not managed by view life cycle, but somewhere else
- **@StateObject**: The object is only initiated just before `body` of the view is created, and destroyed when the view is no longer rendered. In short, life-cycle of the object is managed by the view
- **@EnvironmentObject**: Usually used when we want to create a globally shared Source of truth

## Data Life-cycle
- Tied to the way we defined it

![Data Lifetime](/assets/img/2024/swiftui/data-lifetime.jpg)

- Scene is new screen or new window instance, think Split view in iPad, windows in macOS