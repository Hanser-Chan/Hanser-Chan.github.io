---
title: 将FFmpeg编译成单独的动态链接库
categories: Code
date: 2024-05-01 11:00:00
path_en: FFmpeg_so
tags:
  - Linux
  - C++
  - xiaomi
cover: https://s2.loli.net/2024/09/25/XT5whkUWF6QJrEA.jpg
alias: 2024/05/01/categories/Code/ff/index.html
---

# 将 FFmpeg 编译成单独的动态链接库

> 该教程只实现在**Linux(WSL)**环境对**ffmpeg4.4** + **android-ndk 21**的编译
>
> 现成编译好的在**release**，只实现在安卓上的**arm**架构，x86 请自行探索

来这里找现成的：[跳转到 release](https://github.com/Hanser-Chan/ffmpeg-android-ndk-build-help/releases/tag/so)
这有一个实现：[小米训练营大作业](https://github.com/Hanser-Chan/MI_HW/tree/master/BIGHW)

## 链接为一个库

### 配置下载好 ndk 库

在终端运行：bash 的用`~/.bashrc`

```bash
sudo vim ~/.zshrc
```

文件里添加：记得更改自己的路径

```
export ANDROID_NDK=/home/ubuntu2204/Android/Sdk/ndk/21.3.6528147

export PATH=$PATH:$ANDROID_NDK
```

使用`:wq`退出

```bash
source ~/.zshrc

ndk-build -v
```

### 编译 ffmpeg 库

直接将`ndk-build-only.sh`放置在 ffmpeg 目录下

```bash
./ndk-build-only.sh
```

等待编译即可

### 解读脚本

> **记得更换路径**，下面已经标记所有可能需要更换路径的地方

#### 整体设置

1. **设置变量**：
   - `API=21`：指定了 Android 平台的 API 级别。
   - `NDK=...`：指定了 Android NDK 的路径。
   - `TOOLCHAIN=...`：指定了 LLVM 工具链的路径。
   - `SYSROOT=...`：指定了系统根目录的路径。
   - `ADDITIONAL_CONFIGURE_FLAG`：额外的配置标志，用于指定 FFmpeg 的配置参数。
2. **`build_android` 函数**： 这是一个用于编译 FFmpeg 的函数，其中包含了 FFmpeg 配置和编译的命令。
3. **编译不同架构的 FFmpeg**： 该脚本编译了两种不同架构的 FFmpeg 库，分别是 `arm64-v8a` 和 `armeabi-v7a`。每个架构都会有自己的设置和编译步骤。
4. **具体设置**：
   - 每个架构的设置包括了输出路径、交叉编译器前缀、编译器路径等。这些设置确保了 FFmpeg 能够正确地在特定的架构上编译和运行。
5. **调用 `build_android` 函数**： 最后，脚本分别调用了 `build_android` 函数来编译 `arm64-v8a` 和 `armeabi-v7a` 架构的 FFmpeg 库。

#### 参数

1. `--prefix=$OUTPUT`：指定了安装 FFmpeg 的前缀路径，即编译后生成的文件将要被安装到的目录。
2. `--target-os=android`：指定了目标操作系统是 Android。
3. `--arch=$ARCH`：指定了架构类型，如 `arm64` 或 `arm`。
4. `--cpu=$CPU`：指定了特定的 CPU 类型，如 `armv8-a` 或 `armv7-a`。
5. `--enable-asm`：允许使用汇编代码优化。
6. `--enable-neon`：在 ARM 架构上启用 NEON 指令集优化。
7. `--enable-cross-compile`：启用交叉编译，这意味着你将在一个平台上为另一个平台编译代码。
8. `--disable-shared`：禁用动态库（`.so` 文件）的生成。
9. `--enable-static`：启用静态库（`.a` 文件）的生成。
10. `--disable-doc`：禁用文档的生成。
11. `--disable-ffplay`：禁用 FFplay 的编译。
12. `--disable-ffprobe`：禁用 FFprobe 的编译。
13. `--disable-symver`：禁用符号版本控制。
14. `--disable-ffmpeg`：禁用 FFmpeg 二进制文件的编译。
15. `--sysroot=$SYSROOT`：指定了系统根目录路径，这对于交叉编译是必需的。
16. `--cross-prefix=$CROSS_PREFIX`：指定了交叉编译的前缀，用于交叉编译工具链的命令。
17. `--cc=$CC`：指定了 C 编译器的路径。
18. `--cxx=$CXX`：指定了 C++ 编译器的路径。
19. `--extra-cflags="-fPIC"`：传递额外的 C 语言编译器标志，`-fPIC` 表示生成与位置无关的代码，这对于生成共享库是必要的。

```bash
#!/bin/bash
#make clean
API=21
#记得换路径！！！这里必须换
NDK=/home/cherry/workspace/Android/Sdk/ndk/21.3.6528147
#记得换路径！！！
TOOLCHAIN=$NDK/toolchains/llvm/prebuilt/linux-x86_64
#记得换路径！！！
SYSROOT=$TOOLCHAIN/sysroot

ADDITIONAL_CONFIGURE_FLAG="--enable-avdevice --enable-avcodec --enable-avformat --enable-swresample --enable-swscale --enable-postproc --enable-avfilter"
build_android() {
  echo "===========================1========================"
  ./configure \
  --prefix=$OUTPUT \
  --target-os=android \
  --arch=$ARCH \
  --cpu=$CPU \
  --enable-asm \
  --enable-neon \
  --enable-cross-compile \
  --disable-shared \
  --enable-static \
  --disable-doc \
  --disable-ffplay \
  --disable-ffprobe \
  --disable-symver \
  --disable-ffmpeg \
  --sysroot=$SYSROOT \
  --cross-prefix=$CROSS_PREFIX \
  --cc=$CC \
  --cxx=$CXX \
  --extra-cflags="-fPIC" \
  $ADDITIONAL_CONFIGURE_FLAG
  echo "===========================2====================="
  make clean
  echo "=============================${CC}==============="
  make -j16
  make install
  $COMBILE_TOOLCHAIN_LD \
-rpath-link=$COMBILE_PLATFORM/usr/lib \
-L$COMBILE_PLATFORM/usr/lib \
-L$OUTPUT/lib \
-soname libffmpeg.so -shared -nostdlib -Bsymbolic --whole-archive --no-undefined -o \
$OUTPUT/libffmpeg.so \
    libavcodec/libavcodec.a \
    libavfilter/libavfilter.a \
    libswresample/libswresample.a \
    libavformat/libavformat.a \
    libavutil/libavutil.a \
    libavdevice/libavdevice.a \
    libswscale/libswscale.a \
    -lc -lm -lz -ldl -llog --dynamic-linker=/system/bin/linker \
    $COMBILE_TOOLCHAIN_GCC
}

#arm64-v8a
ARCH=arm64
CPU=armv8-a
CPU_INSTRUCT_COMMON=aarch64-linux-android
#记得换路径！！！这里必须换
OUTPUT=/home/cherry/FFmpeg-n4.4.4/ffbuild/$CPU
CROSS_PREFIX=$TOOLCHAIN/bin/$CPU_INSTRUCT_COMMON-    #AR AS LD等通用
CC=$TOOLCHAIN/bin/aarch64-linux-android$API-clang     #CC单独指定，非通用(因为ndk中CC与AR路径不同，后同理)
CXX=$TOOLCHAIN/bin/aarch64-linux-android$API-clang++  #CXX单独指定，非通用
COMBILE_PLATFORM=$NDK/platforms/android-$API/arch-arm64 #
COMBILE_TOOLCHAIN_LD=$NDK/toolchains/$CPU_INSTRUCT_COMMON-4.9/prebuilt/linux-x86_64/bin/$CPU_INSTRUCT_COMMON-ld
COMBILE_TOOLCHAIN_GCC=$NDK/toolchains/$CPU_INSTRUCT_COMMON-4.9/prebuilt/linux-x86_64/lib/gcc/$CPU_INSTRUCT_COMMON/4.9.x/libgcc.a
build_android

#armeabi-v7a
ARCH=arm
CPU=armv7-a
CPU_INSTRUCT_COMMON=arm-linux-androideabi
#记得换路径！！！这里必须换
OUTPUT=/home/cherry/FFmpeg-n4.4.4/ffbuild/$CPU
CROSS_PREFIX=$TOOLCHAIN/bin/$CPU_INSTRUCT_COMMON-       #AR AS LD等通用
CC=$TOOLCHAIN/bin/armv7a-linux-androideabi$API-clang     #CC单独指定，非通用
CXX=$TOOLCHAIN/bin/armv7a-linux-androideabi$API-clang++  #CXX单独指定，非通用
COMBILE_PLATFORM=$NDK/platforms/android-$API/arch-arm
COMBILE_TOOLCHAIN_LD=$NDK/toolchains/$CPU_INSTRUCT_COMMON-4.9/prebuilt/linux-x86_64/bin/$CPU_INSTRUCT_COMMON-ld
COMBILE_TOOLCHAIN_GCC=$NDK/toolchains/$CPU_INSTRUCT_COMMON-4.9/prebuilt/linux-x86_64/lib/gcc/$CPU_INSTRUCT_COMMON/4.9.x/libgcc.a
build_android
```

## 链接为多个库

使用`ndk-build-split.sh`，其余步骤一样。
