import{_ as n,V as s,W as a,$ as t}from"./framework-8edddef6.js";const p="/offer/base/context.png",e={},c=t(`<h1 id="并发" tabindex="-1"><a class="header-anchor" href="#并发" aria-hidden="true">#</a> 并发</h1><p>Go语言对于并发的支持是纯天然的，这是这门语言的核心所在，其上手难度相对较小，开发人员不太需要关注底层实现就能做出一个相当不错的并发应用，提高了开发人员的下限。</p><br><h2 id="协程" tabindex="-1"><a class="header-anchor" href="#协程" aria-hidden="true">#</a> 协程</h2><p>协程（coroutine）是一种轻量级的线程，或者说是用户态的线程，不受操作系统直接调度，由Go语言自身的调度器进行运行时调度，因此上下文切换开销非常小，这也是为什么Go的并发性能很不错的原因之一。协程这一概念并非Go首次提出，Go也不是第一个支持协程的语言，但Go是第一个能够将协程和并发支持的相当简洁和优雅的语言。</p><br><p>在Go中，创建一个协程十分的简单，仅需要一个<code>go</code>关键字，就能够快速开启一个协程，<code>go</code>关键字后面必须是一个函数调用。例子如下</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>具有返回值的内置函数不允许跟随在<code>go</code>关键字后面，例如下面的错误示范</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">.</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">//  go discards result of make([]int, 10) (value of type []int)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上三种开启协程的方式都是可以的，但是其实这个例子执行过后在大部分情况下什么都不会输出，协程是并发执行的，系统创建协程需要时间，而在此之前，主协程早已运行结束，一旦主线程退出，其他子协程也就自然退出了。并且协程的执行顺序也是不确定的，无法预判的，例如下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个在循环体中开启协程的例子，永远也无法精准的预判到它到底会输出什么。可能子协程还没开始运行，主协程就已经结束了，情况如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>又或者只有一部分子协程在主协程退出前成功运行，情况如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
0  
1  
5  
3  
4  
6  
7  
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最简单的做法就是让主协程等一会儿，需要使用到<code>time</code>包下的<code>Sleep</code>函数，可以使当前协程暂停一段时间，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// 暂停1ms</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次执行输出如下，可以看到所有的数字都完整输出了，没有遗漏</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
0
1
5
2
3
4
6
8
9
7
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是顺序还是乱的，因此让每次循环都稍微的等一下。例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      <span class="token keyword">go</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在的输出已经是正常的顺序了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
0
1
2
3
4
5
6
7
8
9
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中结果输出很完美，那么并发的问题解决了吗，不，一点也没有。对于并发的程序而言，不可控的因素非常多，执行的时机，先后顺序，执行过程的耗时等等，倘若循环中子协程的工作不只是一个简单的输出数字，而是一个非常巨大复杂的任务，耗时的不确定的，那么依旧会重现之前的问题。例如下方代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      <span class="token keyword">go</span> <span class="token function">hello</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 模拟随机耗时</span>
   time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的输出依旧是不确定的，下面是可能的情况之一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
0
3
4
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此<code>time.Sleep</code>并不是一种良好的解决办法，幸运的是Go提供了非常多的并发控制手段，常用的并发控制方法有三种：</p><ul><li><code>channel</code>：管道</li><li><code>WaitGroup</code>：信号量</li><li><code>Context</code>：上下文</li></ul><p>三种方法有着不同的适用情况，<code>WaitGroup</code>可以动态的控制一组指定数量的协程，<code>Context</code>更适合子孙协程嵌套层级更深的情况，管道更适合协程间通信。对于较为传统的锁控制，Go也对此提供了支持：</p><ul><li><code>Mutex</code>：互斥锁</li><li><code>RWMutex</code> ：读写互斥锁</li></ul><br><h2 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h2><p><code>channel</code>，译为管道，Go对于管道的作用如下解释：</p><blockquote><p>Do not communicate by sharing memory; instead, share memory by communicating.</p></blockquote><p>即通过消息来进行内存共享，<code>channel</code>就是为此而生，它是一种在协程间通信的解决方案，同时也可以用于并发控制，先来认识下<code>channel</code>的基本语法。Go中通过关键字<code>chan</code>来代表管道类型，同时也必须声明管道的存储类型，来指定其存储的数据是什么类型，下面的例子是一个普通管道的模样。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> ch <span class="token keyword">chan</span> <span class="token builtin">int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个管道的声明语句，此时管道还未初始化，其值为<code>nil</code>，不可以直接使用。</p><br><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p>在创建管道时，有且只有一种方法，那就是使用内置函数<code>make</code>，对于管道而言，<code>make</code>函数接收两个参数，第一个是管道的类型，第二个是可选参数为管道的缓冲大小。例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token comment">// 缓冲区大小为1的管道</span>
strCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用完一个管道后一定要记得关闭该管道，使用内置函数<code>close</code>来关闭一个管道，该函数签名如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">close</span><span class="token punctuation">(</span>c <span class="token keyword">chan</span><span class="token operator">&lt;-</span> Type<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个关闭管道的例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token comment">// do something</span>
	<span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有些时候使用<code>defer</code>来关闭管道可能会更好。</p><br><h3 id="读写" tabindex="-1"><a class="header-anchor" href="#读写" aria-hidden="true">#</a> 读写</h3><p>对于一个管道而言，Go使用了两种很形象的操作符来表示读写操作：</p><p><code>ch &lt;-</code>：表示对一个管道写入数据</p><p><code>&lt;- ch</code>：表示对一个管道读取数据</p><p><code>&lt;-</code>很生动的表示了数据的流动方向，来看一个对<code>int</code>类型的管道读写的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果没有缓冲区则会导致死锁</span>
	intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
    <span class="token comment">// 写入数据</span>
	intCh <span class="token operator">&lt;-</span> <span class="token number">114514</span>
    <span class="token comment">// 读取数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>intCh<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子中创建了一个缓冲区大小为1的<code>int</code>型管道，对其写入数据<code>114514</code>，然后再读取数据并输出，最后关闭该管道。对于读取操作而言，还有第二个返回值，一个布尔类型的值，用于表示数据是否读取成功</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>ints<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>intCh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>管道中的数据流动方式与队列一样，即先进先出（FIFO），协程对于管道的操作是同步的，在某一个时刻，只有一个协程能够对其写入数据，同时也只有一个协程能够读取管道中的数据。</p><br><h3 id="无缓冲" tabindex="-1"><a class="header-anchor" href="#无缓冲" aria-hidden="true">#</a> 无缓冲</h3><p>对于无缓冲管道而言，因为缓冲区容量为0，所以不会临时存放任何数据。正因为无缓冲管道无法存放数据，在向管道写入数据时必须立刻有其他协程来读取数据，否则就会阻塞等待，读取数据时也是同理，这也解释了为什么下面看起来很正常的代码会发生死锁。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建无缓冲管道</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token comment">// 写入数据</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">123</span>
	<span class="token comment">// 读取数据</span>
	n <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无缓冲管道不应该同步的使用，正确来说应该开启一个新的协程来发送数据，如下例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建无缓冲管道</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 写入数据</span>
		ch <span class="token operator">&lt;-</span> <span class="token number">123</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取数据</span>
	n <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有缓冲" tabindex="-1"><a class="header-anchor" href="#有缓冲" aria-hidden="true">#</a> 有缓冲</h3><p>当管道有了缓冲区，就像是一个阻塞队列一样，读取空的管道和写入已满的管道都会造成阻塞。无缓冲管道在发送数据时，必须立刻有人接收，否则就会一直阻塞。对于有缓冲管道则不必如此，对于有缓冲管道写入数据时，会先将数据放入缓冲区里，只有当缓冲区容量满了才会阻塞的等待协程来读取管道中的数据。同样的，读取有缓冲管道时，会先从缓冲区中读取数据，直到缓冲区没数据了，才会阻塞的等待协程来向管道中写入数据。因此，无缓冲管道中会造成死锁例子在这里可以顺利运行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 创建有缓冲管道</span>
   ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
   <span class="token comment">// 写入数据</span>
   ch <span class="token operator">&lt;-</span> <span class="token number">123</span>
   <span class="token comment">// 读取数据</span>
   n <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管可以顺利运行，但这种同步读写的方式是非常危险的，一旦管道缓冲区空了或者满了，将会永远阻塞下去，因为没有其他协程来向管道中写入或读取数据。来看看下面的一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建有缓冲管道</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token comment">// 创建两个无缓冲管道</span>
	chW <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	chR <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chW<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chR<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 负责写</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> i
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;写入&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		chW <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 负责读</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
            <span class="token comment">// 每次读取数据都需要花费1毫秒</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;读取&quot;</span><span class="token punctuation">,</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		chR <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;写入完毕&quot;</span><span class="token punctuation">,</span> <span class="token operator">&lt;-</span>chW<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;读取完毕&quot;</span><span class="token punctuation">,</span> <span class="token operator">&lt;-</span>chR<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里总共创建了3个管道，一个有缓冲管道用于协程间通信，两个无缓冲管道用于同步父子协程的执行顺序。负责读的协程每次读取之前都会等待1毫秒，负责写的协程一口气做多也只能写入5个数据，因为管道缓冲区最大只有5，在没有协程来读取之前，只能阻塞等待。所以该示例输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>写入 0
写入 1
写入 2
写入 3
写入 4 // 一下写了5个，缓冲区满了，等其他协程来读
读取 0
写入 5 // 读一个，写一个
读取 1
写入 6
读取 2
写入 7
读取 3
写入 8
写入 9
读取 4
写入完毕 {} // 所有的数据都发送完毕，写协程执行完毕
读取 5
读取 6
读取 7
读取 8
读取 9
读取完毕 {} // 所有的数据都读完了，读协程执行完毕
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到负责写的协程刚开始就一口气发送了5个数据，缓冲区满了以后就开始阻塞等待读协程来读取，后面就是每当读协程1毫秒读取一个数据，缓冲区有空位了，写协程就写入一个数据，直到所有数据发送完毕，写协程执行结束，随后当读协程将缓冲区所有数据读取完毕后，读协程也执行结束，最后主协程退出。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>通过内置函数<code>len</code>可以访问管道缓冲区中数据的个数，通过<code>cap</code>可以访问管道缓冲区的大小。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
   ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
   ch <span class="token operator">&lt;-</span> <span class="token number">2</span>
   ch <span class="token operator">&lt;-</span> <span class="token number">3</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><p>利用管道的阻塞条件，可以很轻易的写出一个主协程等待子协程执行完毕的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 创建一个无缓冲管道</span>
   ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
   <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
      <span class="token comment">// 写入</span>
      ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 阻塞等待读取</span>
   <span class="token operator">&lt;-</span>ch
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><br><p>通过有缓冲管道还可以实现一个简单的互斥锁，看下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token comment">// 缓冲区大小为1的管道</span>
<span class="token keyword">var</span> lock <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加锁</span>
	lock <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;当前计数为&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> <span class="token string">&quot;执行加法&quot;</span><span class="token punctuation">)</span>
	count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token comment">// 解锁</span>
	<span class="token operator">&lt;-</span>lock
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Sub</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加锁</span>
	lock <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;当前计数为&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> <span class="token string">&quot;执行减法&quot;</span><span class="token punctuation">)</span>
	count <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token comment">// 解锁</span>
	<span class="token operator">&lt;-</span>lock
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于管道的缓冲区大小为1，最多只有一个数据存放在缓冲区中。<code>Add</code>和<code>Sub</code>函数在每次操作前都会尝试向管道中发送数据，由于缓冲区大小为1，倘若有其他协程已经写入了数据，缓冲区已经满了，当前协程就必须阻塞等待，直到缓冲区空出位置来，如此一来，在某一个时刻，最多只能有一个协程对变量<code>count</code>进行修改，这样就实现了一个简单的互斥锁。</p><br><h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点</h3><p>下面是一些总结，以下几种情况使用不当会导致管道阻塞：</p><p><strong>读写无缓冲管道</strong></p><p>当对一个无缓冲管道直接进行同步读写操作都会导致该协程阻塞</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 创建了一个无缓冲管道</span>
   intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
   <span class="token comment">// 发送数据</span>
   intCh <span class="token operator">&lt;-</span> <span class="token number">1</span>
   <span class="token comment">// 读取数据</span>
   ints<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>intCh
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>读取空缓冲区的管道</strong></p><p>当读取一个缓冲区为空的管道时，会导致该协程阻塞</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 创建的有缓冲管道</span>
   intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
   <span class="token comment">// 缓冲区为空，阻塞等待其他协程写入数据</span>
   ints<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>intCh
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>写入满缓冲区的管道</strong></p><p>当管道的缓冲区已满，对其写入数据会导致该协程阻塞</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建的有缓冲管道</span>
	intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
	
	intCh <span class="token operator">&lt;-</span> <span class="token number">1</span>
    <span class="token comment">// 满了，阻塞等待其他协程来读取数据</span>
	intCh <span class="token operator">&lt;-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>管道为<code>nil</code></strong></p><p>当管道为<code>nil</code>时，无论怎样读写都会导致当前协程阻塞</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> intCh <span class="token keyword">chan</span> <span class="token builtin">int</span>
    <span class="token comment">// 写</span>
	intCh <span class="token operator">&lt;-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> intCh <span class="token keyword">chan</span> <span class="token builtin">int</span>
    <span class="token comment">// 读</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>intCh<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于管道阻塞的条件需要好好掌握和熟悉，大多数情况下这些问题隐藏的十分隐蔽，并不会像例子中那样直观。</p><br><p>以下几种情况还会导致<code>panic</code>：</p><p><strong>关闭一个<code>nil</code>管道</strong></p><p>当管道为<code>nil</code>时，使用<code>close</code>函数对其进行关闭操作会导致panic\`</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> intCh <span class="token keyword">chan</span> <span class="token builtin">int</span>
	<span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>写入已关闭的管道</strong></p><p>对一个已关闭的管道写入数据会导致<code>panic</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	intCh <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token function">close</span><span class="token punctuation">(</span>intCh<span class="token punctuation">)</span>
	intCh <span class="token operator">&lt;-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关闭已关闭的管道</strong></p><p>在一些情况中，管道可能经过层层传递，调用者或许也不知道到底该由谁来关闭管道，如此一来，可能会发生关闭一个已经关闭了的管道，就会发生<code>panic</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">write</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">write</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 只能对管道发送数据</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="单向管道" tabindex="-1"><a class="header-anchor" href="#单向管道" aria-hidden="true">#</a> 单向管道</h3><p>双向管道指的是既可以写，也可以读，即可以在管道两边进行操作。单向管道指的是只读或只写的管道，即只能在管道的一边进行操作。手动创建的一个只读或只写的管道没有什么太大的意义，因为不能对管道读写就失去了其存在的作用。单向管道通常是用来限制通道的行为，一般会在函数的形参和返回值中出现，例如用于关闭通道的内置函数<code>close</code>的函数签名就用到了单向通道。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">close</span><span class="token punctuation">(</span>c <span class="token keyword">chan</span><span class="token operator">&lt;-</span> Type<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>又或者说常用到的<code>time</code>包下的<code>After</code>函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">After</span><span class="token punctuation">(</span>d Duration<span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> Time 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>close</code>函数的形参是一个只写通道，<code>After</code>函数的返回值是一个只读通道，所以单向通道的语法如下：</p><ul><li>箭头符号<code>&lt;-</code>在前，就是只读通道，如<code>&lt;-chan int</code></li><li>箭头符号<code>&lt;-</code>在后，就是只写通道，如<code>chan&lt;- string</code></li></ul><p>当尝试对只读的管道写入数据时，将会无法通过编译</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	timeCh <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	timeCh <span class="token operator">&lt;-</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错如下，意思非常明确</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>invalid operation: cannot send to receive-only channel timeCh (variable of type &lt;-chan time.Time)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对只写的管道读取数据也是同理。</p><br><p>双向管道可以转换为单向管道，反过来则不可以。通常情况下，将双向管道传给某个协程或函数并且不希望它读取/发送数据，就可以用到单向管道来限制另一方的行为。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
   <span class="token keyword">go</span> <span class="token function">write</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">write</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 只能对管道发送数据</span>
   ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只读管道也是一样的道理</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>chan</code>是引用类型，即便Go的函数参数是值传递，但其引用依旧是同一个，这一点会在后续的管道原理中说明。</p></div><h3 id="for-range" tabindex="-1"><a class="header-anchor" href="#for-range" aria-hidden="true">#</a> for range</h3><p>通过<code>for range</code>语句，可以遍历读取缓冲管道中的数据，如下例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> i
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> n <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常来说，<code>for range</code>遍历其他可迭代数据结构时，会有两个返回值，第一个是索引，第二个元素值，但是对于管道而言，有且仅有一个返回值，就是缓冲区的元素值，<code>for range</code>会遍历读取管道缓冲区中的元素，当管道缓冲区为空时，就会阻塞等待，直到有其他协程向管道中写入数据才会继续读取数据，所以输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
1                                                           
2                                                           
3                                                           
4                                                           
5                                                           
6                                                           
7                                                           
8                                                           
9                                                           
fatal error: all goroutines are asleep - deadlock!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到上面的代码发生了死锁，因为子协程已经执行完毕了，而主协程还在阻塞等待其他协程来向管道中写入数据，所以应该管道在写入完毕后将其关闭。修改为如下代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
   <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
         ch <span class="token operator">&lt;-</span> i
      <span class="token punctuation">}</span>
      <span class="token comment">// 关闭管道</span>
      <span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> n <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写完后关闭管道，上述代码便不再会发生死锁。前面提到过读取管道是有两个返回值的，<code>for range</code>遍历管道时，当无法成功读取数据时，便会退出循环。第二个返回值指的是能否成功读取数据，而不是管道是否已经关闭，即便管道已经关闭，对于有缓冲管道而言，依旧可以读取数据，并且第二个返回值仍然为<code>true</code>。看下面的一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> i
	<span class="token punctuation">}</span>
    <span class="token comment">// 关闭管道</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
    <span class="token comment">// 再读取数据</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0 true
1 true 
2 true 
3 true 
4 true 
0 false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于管道已经关闭了，即便缓冲区为空，再读取数据也不会导致当前协程阻塞，可以看到在第六次遍历的时候读取的是零值，并且<code>ok</code>为<code>false</code>。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>关于管道关闭的时机，应该尽量在向管道发送数据的那一方关闭管道，而不要在接收方关闭管道，因为大多数情况下接收方只知道接收数据，并不知道该在什么时候关闭管道。</p></div><br><h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h3><p><code>select</code>在Linux系统中，是一种IO多路复用的解决方案，类似的，在Go中，<code>select</code>是一种管道多路复用的控制结构。什么是多路复用，简单的用一句话概括：在某一时刻，同时监测多个元素是否可用，被监测的可以是网络请求，文件IO等。在Go中的<code>select</code>监测的元素就是管道，且只能是管道。<code>select</code>的语法与<code>switch</code>语句类似，下面看看一个<code>select</code>语句长什么样</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建三个管道</span>
	chA <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chB <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chC <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chA<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
	<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chB<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
	<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chC<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;所有管道都不可用&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>switch</code>类似，<code>select</code>由多个<code>case</code>和一个<code>default</code>组成，<code>default</code>分支可以省略。每一个<code>case</code>只能操作一个管道，且只能进行一种操作，要么读要么写，当有多个<code>case</code>可用时，<code>select</code>会伪随机的选择一个<code>case</code>来执行。如果所有<code>case</code>都不可用，就会执行<code>default</code>分支，倘若没有<code>default</code>分支，将会阻塞等待，直到至少有一个<code>case</code>可用。由于上例中没有对管道写入数据，自然所有的<code>case</code>都不可用，所以最终输出为<code>default</code>分支的执行结果。稍微修改下后如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   chA <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
   chB <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
   chC <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">close</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
      <span class="token function">close</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
      <span class="token function">close</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 开启一个新的协程</span>
   <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 向A管道写入数据</span>
      chA <span class="token operator">&lt;-</span> <span class="token number">1</span>
   <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">select</span> <span class="token punctuation">{</span>
   <span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chA<span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
   <span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chB<span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
   <span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chC<span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上例开启了一个新的协程来向管道A写入数据，<code>select</code>由于没有默认分支，所以会一直阻塞等待直到有<code>case</code>可用。当管道A可用时，执行完对应分支后主协程就直接退出了。要想一直监测管道，可以配合<code>for</code>循环使用，如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chA <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chB <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chC <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>
	<span class="token comment">// for循环</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chA<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
		<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chB<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
		<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chC<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Send</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
		ch <span class="token operator">&lt;-</span> i
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样确实三个管道都能用上了，但是死循环+<code>select</code>会导致主协程永久阻塞，所以可以将其单独放到新协程中，并且加上一些其他的逻辑。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chA <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chB <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	chC <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	l <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chB<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Send</span><span class="token punctuation">(</span>chC<span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	Loop<span class="token punctuation">:</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chA<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
			<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chB<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
			<span class="token keyword">case</span> n<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chC<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment">// 设置1秒的超时时间</span>
				<span class="token keyword">break</span> Loop <span class="token comment">// 退出循环</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		l <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 告诉主协程可以退出了</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token operator">&lt;-</span>l
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Send</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
		ch <span class="token operator">&lt;-</span> i
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上例中通过<code>for</code>循环配合<code>select</code>来一直监测三个管道是否可以用，并且第四个<code>case</code>是一个超时管道，超时过后便会退出循环，结束子协程。最终输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>C 0 true
A 0 true
B 0 true
A 1 true
B 1 true
C 1 true
B 2 true
C 2 true
A 2 true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>超时</strong></p><p>上一个例子用到了<code>time.After</code>函数，其返回值是一个只读的管道，该函数配合<code>select</code>使用可以非常简单的实现超时机制，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chA <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">close</span><span class="token punctuation">(</span>chA<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
		chA <span class="token operator">&lt;-</span> <span class="token number">1</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> n <span class="token operator">:=</span> <span class="token operator">&lt;-</span>chA<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;超时&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p><strong>永久阻塞</strong></p><p>当<code>select</code>语句中什么都没有时，就会永久阻塞，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>end</code>永远也不会输出，主协程会一直阻塞，这种情况一般是有特殊用途。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在<code>select</code>的<code>case</code>中对值为<code>nil</code>的管道进行操作的话，并不会导致阻塞，该<code>case</code>则会被忽略，永远也不会被执行。例如下方代码无论执行多少次都只会输出timeout。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> nilCh <span class="token keyword">chan</span> <span class="token builtin">int</span>
   <span class="token keyword">select</span> <span class="token punctuation">{</span>
   <span class="token keyword">case</span> <span class="token operator">&lt;-</span>nilCh<span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;read&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">case</span> nilCh <span class="token operator">&lt;-</span> <span class="token number">1</span><span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;write&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">:</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;timeout&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><br><h2 id="waitgroup" tabindex="-1"><a class="header-anchor" href="#waitgroup" aria-hidden="true">#</a> WaitGroup</h2><p><code>sync.WaitGroup</code>是<code>sync</code>包下提供的一个结构体，<code>WaitGroup</code>即等待执行，使用它可以很轻易的实现等待一组协程的效果。该结构体只对外暴露三个方法。</p><p><code>Add</code>方法用于指明要等待的协程的数量</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wg <span class="token operator">*</span>WaitGroup<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>delta <span class="token builtin">int</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Done</code>方法表示当前协程已经执行完毕</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wg <span class="token operator">*</span>WaitGroup<span class="token punctuation">)</span> <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Wait</code>方法等待子协程结束，否则就阻塞</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wg <span class="token operator">*</span>WaitGroup<span class="token punctuation">)</span> <span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p><code>WaitGroup</code>使用起来十分简单，属于开箱即用。其内部的实现是计数器+信号量，程序开始时调用<code>Add</code>初始化计数，每当一个协程执行完毕时调用<code>Done</code>，计数就-1，直到减为0，而在此期间，主协程调用<code>Wait</code> 会一直阻塞直到全部计数减为0，然后才会被唤醒。看一个简单的使用例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
	<span class="token comment">// 指定子协程的数量</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token comment">// 执行完毕</span>
		wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 等待子协程</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码永远都是先输出1再输出2，主协程会等待子协程执行完毕后再退出。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>针对协程介绍中最开始的例子，可以做出如下修改</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> mainWait sync<span class="token punctuation">.</span>WaitGroup
   <span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
   <span class="token comment">// 计数10</span>
   mainWait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      <span class="token comment">// 循环内计数1</span>
      wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
         <span class="token comment">// 两个计数-1</span>
         wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
         mainWait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 等待当前循环的协程执行完毕</span>
      wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// 等待所有的协程执行完毕</span>
   mainWait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用了<code>sync.WaitGroup</code>替代了原先的<code>time.Sleep</code>，协程并发执行的的顺序更加可控，不管执行多少次，输出都如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start
0  
1  
2  
3  
4  
5  
6  
7  
8  
9  
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>WaitGroup</code>通常适用于可动态调整协程数量的时候，例如事先知晓协程的数量，又或者在运行过程中需要动态调整。<code>WaitGroup</code>的值不应该被复制，复制后的值也不应该继续使用，尤其是将其作为函数参数传递时，因该传递指针而不是值。倘若使用复制的值，计数完全无法作用到真正的<code>WaitGroup</code>上，这可能会导致主协程一直阻塞等待，程序将无法正常运行。例如下方的代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> mainWait sync<span class="token punctuation">.</span>WaitGroup
	mainWait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token function">hello</span><span class="token punctuation">(</span>mainWait<span class="token punctuation">)</span>
	mainWait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">hello</span><span class="token punctuation">(</span>wait sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>错误提示所有的协程都已经退出，但主协程依旧在等待，这就形成了死锁，因为<code>hello</code>函数内部对一个形参<code>WaitGroup</code>调用<code>Done</code>并不会作用到原来的<code>mainWait</code>上，所以应该使用指针来进行传递。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hello
fatal error: all goroutines are asleep - deadlock!  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>当计数变为负数，或者计数数量大于子协程数量时，将会引发<code>panic</code>。</p></div><h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h2><p><code>Context</code>译为上下文，是Go提供的一种并发控制的解决方案，相比于管道和<code>WaitGroup</code>，它可以更好的控制子孙协程以及层级更深的协程。<code>Context</code>本身是一个接口，只要实现了该接口都可以称之为上下文例如著名Web框架<code>Gin</code>中的<code>gin.Context</code>。<code>context</code>标准库也提供了几个实现，分别是：</p><ul><li><code>emptyCtx</code></li><li><code>cancelCtx</code></li><li><code>timerCtx</code></li><li><code>valueCtx</code></li></ul><br><h3 id="context-1" tabindex="-1"><a class="header-anchor" href="#context-1" aria-hidden="true">#</a> Context</h3><p>先来看看<code>Context</code>接口的定义，再去了解它的具体实现。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Context <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   
   <span class="token function">Deadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span>

   <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

   <span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>

   <span class="token function">Value</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> any
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Deadline</strong></p><p>该方法具有两个返回值，<code>deadline</code>是截止时间，即上下文应该取消的时间。第二个值是是否设置<code>deadline</code>，如果没有设置则一直为<code>false</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">Deadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Done</strong></p><p>其返回值是一个空结构体类型的只读管道，该管道仅仅起到通知作用，不传递任何数据。当上下文所做的工作应该取消时，该通道就会被关闭，对于一些不支持取消的上下文，可能会返回<code>nil</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Err</strong></p><p>该方法返回一个<code>error</code>，用于表示上下关闭的原因。当<code>Done</code>管道没有关闭时，返回<code>nil</code>，如果关闭过后，会返回一个<code>err</code>来解释为什么会关闭。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Value</strong></p><p>该方法返回对应的键值，如果<code>key</code>不存在，或者不支持该方法，就会返回<code>nil</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">Value</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> any
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h3 id="emptyctx" tabindex="-1"><a class="header-anchor" href="#emptyctx" aria-hidden="true">#</a> emptyCtx</h3><p>顾名思义，<code>emptyCtx</code>就是空的上下文，<code>context</code>包下所有的实现都是不对外暴露的，但是提供了对应的函数来创建上下文。<code>emptyCtx</code>就可以通过<code>context.Background</code>和<code>context.TODO</code>来进行创建。两个函数如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
	background <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>emptyCtx<span class="token punctuation">)</span>
	todo       <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>emptyCtx<span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Context <span class="token punctuation">{</span>
	<span class="token keyword">return</span> background
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Context <span class="token punctuation">{</span>
	<span class="token keyword">return</span> todo
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到仅仅只是返回了<code>emptyCtx</code>指针。<code>emptyCtx</code>的底层类型实际上是一个<code>int</code>，之所以不使用空结构体，是因为<code>emptyCtx</code>的实例必须要有不同的内存地址，它没法被取消，没有<code>deadline</code>，也不能取值，实现的方法都是返回零值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> emptyCtx <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Deadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Value</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> any <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>emptyCtx</code>通常是用来当作最顶层的上下文，在创建其他三种上下文时作为父上下文传入。context包中的各个实现关系如下图所示</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="valuectx" tabindex="-1"><a class="header-anchor" href="#valuectx" aria-hidden="true">#</a> valueCtx</h3><p><code>valueCtx</code>实现比较简单，其内部只包含一对键值对，和一个内嵌的<code>Context</code>类型的字段。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> valueCtx <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   Context
   key<span class="token punctuation">,</span> val any
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其本身只实现了<code>Value</code>方法，逻辑也很简单，当前上下文找不到就去父上下文找。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>valueCtx<span class="token punctuation">)</span> <span class="token function">Value</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> any <span class="token punctuation">{</span>
   <span class="token keyword">if</span> c<span class="token punctuation">.</span>key <span class="token operator">==</span> key <span class="token punctuation">{</span>
      <span class="token keyword">return</span> c<span class="token punctuation">.</span>val
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token function">value</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看一个<code>valueCtx</code>的简单使用案例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> waitGroup sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	waitGroup<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">// 传入上下文</span>
	<span class="token keyword">go</span> <span class="token function">Do</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	waitGroup<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Do</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 新建定时器</span>
	ticker <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTimer</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> waitGroup<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment">// 永远也不会执行</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ticker<span class="token punctuation">.</span>C<span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;timeout&quot;</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>valueCtx</code>多用于在多级协程中传递一些数据，无法被取消，因此<code>ctx.Done</code>永远会返回<code>nil</code>，<code>select</code>会忽略掉<code>nil</code>管道。最后输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
2
2
2
2
2
2
2
2
2
timeout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="cancelctx" tabindex="-1"><a class="header-anchor" href="#cancelctx" aria-hidden="true">#</a> cancelCtx</h3><p><code>cancelCtx</code>以及<code>timerCtx</code>都实现了<code>canceler</code>接口，接口类型如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> canceler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// removeFromParent 表示是否从父上下文中删除自身</span>
    <span class="token comment">// err 表示取消的原因</span>
	<span class="token function">cancel</span><span class="token punctuation">(</span>removeFromParent <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token comment">// Done 返回一个管道，用于通知取消的原因</span>
	<span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cancel</code>方法不对外暴露，在创建上下文时通过闭包将其包装为返回值以供外界调用，就如<code>context.WithCancel</code>源代码中所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctx Context<span class="token punctuation">,</span> cancel CancelFunc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> parent <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;cannot create context from nil parent&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   c <span class="token operator">:=</span> <span class="token function">newCancelCtx</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span>
   <span class="token comment">// 尝试将自身添加进父级的children中</span>
   <span class="token function">propagateCancel</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> <span class="token operator">&amp;</span>c<span class="token punctuation">)</span>
   <span class="token comment">// 返回context和一个函数</span>
   <span class="token keyword">return</span> <span class="token operator">&amp;</span>c<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> c<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> Canceled<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cancelCtx</code>译为可取消的上下文，创建时，如果父级实现了<code>canceler</code>，就会将自身添加进父级的<code>children</code>中，否则就一直向上查找。如果所有的父级都没有实现<code>canceler</code>，就会启动一个协程等待父级取消，然后当父级结束时取消当前上下文。当调用<code>cancelFunc</code>时，<code>Done</code>通道将会关闭，该上下文的任何子级也会随之取消，最后会将自身从父级中删除。下面是一个简单的示例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> waitGroup sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bkg <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回了一个cancelCtx和cancel函数</span>
	cancelCtx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>bkg<span class="token punctuation">)</span>
	waitGroup<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> waitGroup<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token keyword">default</span><span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;等待取消中...&quot;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span><span class="token punctuation">(</span>cancelCtx<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	waitGroup<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>等待取消中...
等待取消中...
等待取消中...
等待取消中...
等待取消中...
context canceled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来一个层级嵌套深一点的示例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> waitGroup sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   waitGroup<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
   ctx<span class="token punctuation">,</span> cancelFunc <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token keyword">go</span> <span class="token function">HttpHandler</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
   time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
   <span class="token function">cancelFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   waitGroup<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">HttpHandler</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   cancelCtxAuth<span class="token punctuation">,</span> cancelAuth <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
   cancelCtxMail<span class="token punctuation">,</span> cancelMail <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

   <span class="token keyword">defer</span> <span class="token function">cancelAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> <span class="token function">cancelMail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">defer</span> waitGroup<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

   <span class="token keyword">go</span> <span class="token function">AuthService</span><span class="token punctuation">(</span>cancelCtxAuth<span class="token punctuation">)</span>
   <span class="token keyword">go</span> <span class="token function">MailService</span><span class="token punctuation">(</span>cancelCtxMail<span class="token punctuation">)</span>

   <span class="token keyword">for</span> <span class="token punctuation">{</span>
      <span class="token keyword">select</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span>
      <span class="token keyword">default</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;正在处理http请求...&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">AuthService</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">defer</span> waitGroup<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> <span class="token punctuation">{</span>
      <span class="token keyword">select</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;auth 父级取消&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span>
      <span class="token keyword">default</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;auth...&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">MailService</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">defer</span> waitGroup<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> <span class="token punctuation">{</span>
      <span class="token keyword">select</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;mail 父级取消&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         <span class="token keyword">return</span>
      <span class="token keyword">default</span><span class="token punctuation">:</span>
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;mail...&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中创建了3个<code>cancelCtx</code>，尽管父级<code>cancelCtx</code>在取消的同时会取消它的子上下文，但是保险起见，如果创建了一个<code>cancelCtx</code>，在相应的流程结束后就应该调用<code>cancel</code>函数。输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>正在处理http请求...
auth...
mail...
mail...
auth...
正在处理http请求...
auth...
mail...
正在处理http请求...
正在处理http请求...
auth...
mail...
auth...
正在处理http请求...
mail...
context canceled
auth 父级取消 context canceled
mail 父级取消 context canceled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="timerctx" tabindex="-1"><a class="header-anchor" href="#timerctx" aria-hidden="true">#</a> timerCtx</h3><p><code>timerCtx</code>在<code>cancelCtx </code>的基础之上增加了超时机制，<code>context</code>包下提供了两种创建的函数，分别是<code>WithDeadline</code>和<code>WithTimeout</code>，两者功能类似，前者是指定一个具体的超时时间，比如指定一个具体时间<code>2023/3/20 16:32:00</code>，后者是指定一个超时的时间间隔，比如5分钟后。两个函数的签名如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithDeadline</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> d time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WithTimeout</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>timerCtx</code>会在时间到期后自动取消当前上下文，取消的流程除了要额外的关闭<code>timer</code>之外，基本与<code>cancelCtx</code>一致。下面是一个简单的<code>timerCtx</code>的使用示例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	deadline<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithDeadline</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;上下文取消&quot;</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token keyword">default</span><span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;等待取消中...&quot;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">200</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>deadline<span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管上下文到期会自动取消，但是为了保险起见，在相关流程结束后，最好手动取消上下文。输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>等待取消中...
等待取消中...
等待取消中...
等待取消中...
等待取消中...
上下文取消 context deadline exceeded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>WithTimeout</code>其实与<code>WithDealine</code>非常相似，它的实现也只是稍微封装了一下并调用<code>WithDeadline</code>，和上面例子中的<code>WithDeadline</code>用法一样，如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithTimeout</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token function">WithDeadline</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>就跟内存分配后不回收会造成内存泄漏一样，上下文也是一种资源，如果创建了但从来不取消，一样会造成上下文泄露，所以最好避免此种情况的发生。</p></div><br><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2><p>先来看看的一个例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>data <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 模拟访问耗时</span>
         time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         <span class="token comment">// 访问数据</span>
         temp <span class="token operator">:=</span> <span class="token operator">*</span>data
         <span class="token comment">// 模拟计算耗时</span>
         time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
         ans <span class="token operator">:=</span> <span class="token number">1</span>
         <span class="token comment">// 修改数据</span>
         <span class="token operator">*</span>data <span class="token operator">=</span> temp <span class="token operator">+</span> ans
         fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>data<span class="token punctuation">)</span>
         wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于上面的例子，开启了十个协程来对<code>count</code>进行<code>+1</code>操作，并且使用了<code>time.Sleep</code>来模拟不同的耗时，根据直觉来讲，10个协程执行10个<code>+1</code>操作，最终结果一定是<code>10</code>，正确结果也确实是<code>10</code>，但事实并非如此，上面的例子执行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
2
3
3
2
2
3
3
3
4
最终结果 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到最终结果为4，而这只是众多可能结果中的一种。由于每个协程访问和计算所需的时间不同，A协程访问数据耗费500毫秒，此时访问到的<code>count</code>值为1，随后又花费了400毫秒计算，但在这400毫秒内，B协程已经完成了访问和计算并成功更新了<code>count</code>的值，A协程在计算完毕后，A协程最初访问到的值已经过时了，但A协程并不知道这件事，依旧在原先访问到的值基础上加一，并赋值给<code>count</code>，这样一来，B协程的执行结果被覆盖了。多个协程读取和访问一个共享数据时，尤其会发生这样的问题，为此就需要用到锁。</p><p>Go中<code>sync</code>包下的<code>Mutex</code>与<code>RWMutex</code>提供了互斥锁与读写锁两种实现，且提供了非常简单易用的API，加锁只需要<code>Lock()</code>，解锁也只需要<code>Unlock()</code>。需要注意的是，Go所提供的锁都是非递归锁，也就是不可重入锁，所以重复加锁或重复解锁都会导致<code>fatal</code>。锁的意义在于保护不变量，加锁是希望数据不会被其他协程修改，如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 在这个过程中，数据不会被其他协程修改</span>
	<span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>倘若是递归锁的话，就可能会发生如下情况</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">DoOther</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">DoOther</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// do other</span>
	<span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>DoSomthing</code>函数显然不知道<code>DoOther</code>函数可能会对数据做点什么，从而修改了数据，比如再开几个子协程破坏了不变量。这在Go中是行不通的，一旦加锁以后就必须保证不变量的不变性，此时重复加锁解锁都会导致死锁。所以在编写代码时应该避免上述情况，必要时在加锁的同时立即使用<code>defer</code>语句解锁。</p><br><h3 id="互斥锁" tabindex="-1"><a class="header-anchor" href="#互斥锁" aria-hidden="true">#</a> 互斥锁</h3><p><code>sync.Mutex</code>是Go提供的互斥锁实现，其实现了<code>sync.Locker</code>接口</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Locker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token comment">// 加锁</span>
   <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token comment">// 解锁</span>
   <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用互斥锁可以非常完美的解决上述问题，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>Mutex

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>data <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 加锁</span>
			lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">// 模拟访问耗时</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token comment">// 访问数据</span>
			temp <span class="token operator">:=</span> <span class="token operator">*</span>data
			<span class="token comment">// 模拟计算耗时</span>
			time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			ans <span class="token operator">:=</span> <span class="token number">1</span>
			<span class="token comment">// 修改数据</span>
			<span class="token operator">*</span>data <span class="token operator">=</span> temp <span class="token operator">+</span> ans
			<span class="token comment">// 解锁</span>
			lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>data<span class="token punctuation">)</span>
			wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一个协程在访问数据前，都先上锁，更新完成后再解锁，其他协程想要访问就必须要先获得锁，否则就阻塞等待。如此一来，就不存在上述问题了，所以输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
2
3
4
5
6
7
8
9
10
最终结果 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="读写锁" tabindex="-1"><a class="header-anchor" href="#读写锁" aria-hidden="true">#</a> 读写锁</h3><p>互斥锁适合读操作与写操作频率都差不多的情况，对于一些读多写少的数据，如果使用互斥锁，会造成大量的不必要的协程竞争锁，这会消耗很多的系统资源，这时候就需要用到读写锁，即读写互斥锁，对于一个协程而言：</p><ul><li>如果获得了读锁，其他协程进行写操作时会阻塞，其他协程进行读操作时不会阻塞</li><li>如果获得了写锁，其他协程进行写操作时会阻塞，其他协程进行读操作时会阻塞</li></ul><p>Go中读写互斥锁的实现是<code>sync.RWMutex</code>，它也同样实现了<code>Locker</code>接口，但它提供了更多可用的方法，如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 加读锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 

<span class="token comment">// 尝试加读锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">TryRLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> 

<span class="token comment">// 解读锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 

<span class="token comment">// 加写锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 尝试加写锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">TryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> 

<span class="token comment">// 解写锁</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>TryRlock</code>与<code>TryLock</code>两个尝试加锁的操作是非阻塞式的，成功加锁会返回<code>true</code>，无法获得锁时并不会阻塞而是返回<code>false</code>。读写互斥锁内部实现依旧是互斥锁，并不是说分读锁和写锁就有两个锁，从始至终都只有一个锁。下面来看一个读写互斥锁的使用案例</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">var</span> rw sync<span class="token punctuation">.</span>RWMutex

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span>
	<span class="token comment">// 读多写少</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">7</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 等待子协程结束</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Read</span><span class="token punctuation">(</span>i <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;拿到读锁&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;释放读锁&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>i<span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Write</span><span class="token punctuation">(</span>i <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;拿到写锁&quot;</span><span class="token punctuation">)</span>
	temp <span class="token operator">:=</span> <span class="token operator">*</span>i
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token operator">*</span>i <span class="token operator">=</span> temp <span class="token operator">+</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;释放写锁&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>i<span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该例开启了3个写协程，7个读协程，在读数据的时候都会先获得读锁，读协程可以正常获得读锁，但是会阻塞写协程，获得写锁的时候，则会同时阻塞读协程和写协程，直到释放写锁，如此一来实现了读协程与写协程互斥，保证了数据的正确性。例子输出如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>拿到读锁
拿到读锁
拿到读锁
拿到读锁
释放读锁 0
释放读锁 0
释放读锁 0
释放读锁 0
拿到写锁
释放写锁 1
拿到读锁  
拿到读锁
拿到读锁
释放读锁 1
释放读锁 1
释放读锁 1
拿到写锁
释放写锁 2
拿到写锁
释放写锁 3
最终结果 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>对于锁而言，不应该将其作为值传递和存储，应该使用指针。</p></div><br><h3 id="条件变量" tabindex="-1"><a class="header-anchor" href="#条件变量" aria-hidden="true">#</a> 条件变量</h3><p>条件变量，与互斥锁一同出现和使用，所以有些人可能会误称为条件锁，但它并不是锁，是一种通讯机制。Go中的<code>sync.Cond</code>对此提供了实现，而创建条件变量的函数签名如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewCond</span><span class="token punctuation">(</span>l Locker<span class="token punctuation">)</span> <span class="token operator">*</span>Cond 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到创建一个条件变量前提就是需要创建一个锁，<code>sync.Cond</code>提供了如下的方法以供使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 阻塞等待条件生效，直到被唤醒</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Cond<span class="token punctuation">)</span> <span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 唤醒一个因条件阻塞的协程</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Cond<span class="token punctuation">)</span> <span class="token function">Signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 唤醒所有因条件阻塞的协程</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Cond<span class="token punctuation">)</span> <span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>条件变量使用起来非常简单，将上面的读写互斥锁的例子稍微修改下即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">var</span> rw sync<span class="token punctuation">.</span>RWMutex

<span class="token comment">// 条件变量</span>
<span class="token keyword">var</span> cond <span class="token operator">=</span> sync<span class="token punctuation">.</span><span class="token function">NewCond</span><span class="token punctuation">(</span>rw<span class="token punctuation">.</span><span class="token function">RLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span>
	<span class="token comment">// 读多写少</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">7</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 等待子协程结束</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;最终结果&quot;</span><span class="token punctuation">,</span> count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Read</span><span class="token punctuation">(</span>i <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;拿到读锁&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 条件不满足就一直阻塞</span>
	<span class="token keyword">for</span> <span class="token operator">*</span>i <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">{</span>
		cond<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;释放读锁&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>i<span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Write</span><span class="token punctuation">(</span>i <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;拿到写锁&quot;</span><span class="token punctuation">)</span>
	temp <span class="token operator">:=</span> <span class="token operator">*</span>i
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token operator">*</span>i <span class="token operator">=</span> temp <span class="token operator">+</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;释放写锁&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>i<span class="token punctuation">)</span>
	rw<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 唤醒所有因条件变量阻塞的协程</span>
	cond<span class="token punctuation">.</span><span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在创建条件变量时，因为在这里条件变量作用的是读协程，所以将读锁作为互斥锁传入，如果直接传入读写互斥锁会导致写协程重复解锁的问题。这里传入的是<code>sync.rlocker</code>，通过<code>RWMutex.RLocker</code>方法获得。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>rw <span class="token operator">*</span>RWMutex<span class="token punctuation">)</span> <span class="token function">RLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Locker <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">*</span>rlocker<span class="token punctuation">)</span><span class="token punctuation">(</span>rw<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> rlocker RWMutex

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>rlocker<span class="token punctuation">)</span> <span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token operator">*</span>RWMutex<span class="token punctuation">)</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>rlocker<span class="token punctuation">)</span> <span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token operator">*</span>RWMutex<span class="token punctuation">)</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到<code>rlocker</code>也只是把读写互斥锁的读锁操作封装了一下，实际上是同一个引用，依旧是同一个锁。读协程读取数据时，如果小于3就会一直阻塞等待，直到数据大于3，而写协程在更新数据后都会尝试唤醒所有因条件变量而阻塞的协程，所以最后的输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>拿到读锁
拿到读锁
拿到读锁
拿到读锁
拿到写锁
释放写锁 1
拿到读锁
拿到写锁
释放写锁 2
拿到读锁
拿到读锁
拿到写锁
释放写锁 3 // 第三个写协程执行完毕
释放读锁 3
释放读锁 3
释放读锁 3
释放读锁 3
释放读锁 3
释放读锁 3
释放读锁 3
最终结果 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从结果中可以看到，当第三个写协程更新完数据后，七个因条件变量而阻塞的读协程都恢复了运行。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>对于条件变量，应该使用<code>for</code>而不是<code>if</code>，应该使用循环来判断条件是否满足，因为协程被唤醒时并不能保证当前条件就已经满足了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">for</span> <span class="token operator">!</span>condition <span class="token punctuation">{</span>
	cond<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="sync" tabindex="-1"><a class="header-anchor" href="#sync" aria-hidden="true">#</a> sync</h2><p>Go中很大一部分的并发相关的工具都是<code>sync</code>标准库提供的，上述已经介绍过了<code>sync.WaitGroup</code>，<code>sync.Locker</code>等，除此之外，<code>sync</code>包下还有一些其他的工具可以使用。</p><br><h3 id="once" tabindex="-1"><a class="header-anchor" href="#once" aria-hidden="true">#</a> Once</h3><p>当在使用一些数据结构时，如果这些数据结构太过庞大，可以考虑采用懒加载的方式，即真正要用到它的时候才会初始化该数据结构。如下面的例子</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> MySlice <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MySlice<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token operator">*</span>m <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token operator">*</span>m<span class="token punctuation">)</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MySlice<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 当真正用到切片的时候，才会考虑去初始化</span>
   <span class="token keyword">if</span> <span class="token operator">*</span>m <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token operator">*</span>m <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token operator">*</span>m <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token operator">*</span>m<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么问题就来了，如果只有一个协程使用肯定是没有任何问题的，但是如果有多个协程访问的话就可能会出现问题了。比如协程A和B同时调用了<code>Add</code>方法，A执行的稍微快一些，已经初始化完毕了，并且将数据成功添加，随后协程B又初始化了一遍，这样一来将协程A添加的数据直接覆盖掉了，这就是问题所在。</p><p>而这就是<code>sync.Once</code>要解决的问题，顾名思义，<code>Once</code>译为一次，<code>sync.Once</code>保证了在并发条件下指定操作只会执行一次。它的使用非常简单，只对外暴露了一个<code>Do</code>方法，签名如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Once<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在使用时，只需要将初始化操作传入<code>Do</code>方法即可，如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> slice MySlice
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			slice<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
			wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>slice<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MySlice <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	o sync<span class="token punctuation">.</span>Once
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MySlice<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> m<span class="token punctuation">.</span>s <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> m<span class="token punctuation">.</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MySlice<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 当真正用到切片的时候，才会考虑去初始化</span>
	m<span class="token punctuation">.</span>o<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;初始化&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> m<span class="token punctuation">.</span>s <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			m<span class="token punctuation">.</span>s <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span>s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>s<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MySlice<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>初始化
4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出结果中可以看到，所有的数据等正常添加进切片，初始化操作只执行了一次。其实<code>sync.Once</code>的实现相当简单，去除注释真正的代码逻辑只有16行，其原理就是锁+原子操作。源代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Once <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// 用于判断操作是否已经执行</span>
	done <span class="token builtin">uint32</span>
	m    Mutex
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Once<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 原子加载数据</span>
	<span class="token keyword">if</span> atomic<span class="token punctuation">.</span><span class="token function">LoadUint32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>o<span class="token punctuation">.</span>done<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		o<span class="token punctuation">.</span><span class="token function">doSlow</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Once<span class="token punctuation">)</span> <span class="token function">doSlow</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加锁</span>
	o<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 解锁</span>
	<span class="token keyword">defer</span> o<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 判断是否执行</span>
	<span class="token keyword">if</span> o<span class="token punctuation">.</span>done <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行完毕后修改done</span>
		<span class="token keyword">defer</span> atomic<span class="token punctuation">.</span><span class="token function">StoreUint32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>o<span class="token punctuation">.</span>done<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="pool" tabindex="-1"><a class="header-anchor" href="#pool" aria-hidden="true">#</a> Pool</h3><p><code>sync.Pool</code>的设计目的是用于存储临时对象以便后续的复用，是一个临时的并发安全对象池，将暂时用不到的对象放入池中，在后续使用中就不需要再额外的创建对象可以直接复用，减少内存的分配与释放频率，最重要的一点就是降低GC压力。<code>sync.Pool</code>总共只有两个方法，如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 申请一个对象</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any

<span class="token comment">// 放入一个对象</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>x any<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且<code>sync.Pool</code>有一个对外暴露的<code>New</code>字段，用于对象池在申请不到对象时初始化一个对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>New <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面以一个例子演示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup

<span class="token comment">// 临时对象池</span>
<span class="token keyword">var</span> pool sync<span class="token punctuation">.</span>Pool

<span class="token comment">// 用于计数过程中总共创建了多少个对象</span>
<span class="token keyword">var</span> numOfObject atomic<span class="token punctuation">.</span>Int64

<span class="token comment">// BigMemData 假设这是一个占用内存很大的结构体</span>
<span class="token keyword">type</span> BigMemData <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   M <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   pool<span class="token punctuation">.</span>New <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span>
      numOfObject<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> BigMemData<span class="token punctuation">{</span><span class="token string">&quot;大内存&quot;</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
   <span class="token comment">// 这里开启1000个协程</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token comment">// 申请对象</span>
         val <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
         <span class="token comment">// 使用对象</span>
         <span class="token boolean">_</span> <span class="token operator">=</span> val<span class="token punctuation">.</span><span class="token punctuation">(</span>BigMemData<span class="token punctuation">)</span>
         <span class="token comment">// 用完之后再释放对象</span>
         pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
         wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>numOfObject<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中开启了1000个协程不断的在池中申请和释放对象，如果不采用对象池，那么1000个协程都需要各自实例化对象，并且这1000个实例化后的对象在使用完毕后都需要由GC来释放内存，如果有几十万个协程或者说创建该对象的成本十分的高昂，这种情况下就会占用很大的内存并且给GC带来非常大的压力，采用对象池后，可以复用对象减少实例化的频率，比如上述的例子输出可能如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即便开启了1000个协程，整个过程中也只创建了5个对象，如果不采用对象池的话1000个协程将会创建1000个对象，这种优化带来的提升是显而易见的，尤其是在并发量特别大和实例化对象成本特别高的时候更能体现出优势。</p><p>在使用<code>sync.Pool</code>时需要注意几个点：</p><ul><li>临时对象：<code>sync.Pool</code>只适合存放临时对象，池中的对象可能会在没有任何通知的情况下被GC移除，所以并不建议将网络链接，数据库连接这类存入<code>sync.Pool</code>中。</li><li>不可预知：<code>sync.Pool</code>在申请对象时，无法预知这个对象是新创建的还是复用的，也无法知晓池中有几个对象</li><li>并发安全：官方保证<code>sync.Pool</code>一定是并发安全，但并不保证用于创建对象的<code>New</code>函数就一定是并发安全的，<code>New</code>函数是由使用者传入的，所以<code>New</code>函数的并发安全性要由使用者自己来维护，这也是为什么上例中对象计数要用到原子值的原因。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>最后需要注意的是，当使用完对象后，一定要释放回池中，如果用了不释放那么对象池的使用将毫无意义。</p></div><p>标准库<code>fmt</code>包下就有一个对象池的使用案例，在<code>fmt.Fprintf</code>函数中</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Fprintf</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> format <span class="token builtin">string</span><span class="token punctuation">,</span> a <span class="token operator">...</span>any<span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 申请一个打印缓冲区</span>
   p <span class="token operator">:=</span> <span class="token function">newPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   p<span class="token punctuation">.</span><span class="token function">doPrintf</span><span class="token punctuation">(</span>format<span class="token punctuation">,</span> a<span class="token punctuation">)</span>
   n<span class="token punctuation">,</span> err <span class="token operator">=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>buf<span class="token punctuation">)</span>
   <span class="token comment">// 使用完毕后释放</span>
   p<span class="token punctuation">.</span><span class="token function">free</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>newPointer</code>函数和<code>free</code>方法的实现如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">newPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>pp <span class="token punctuation">{</span>
   <span class="token comment">// 向对象池申请的一个对象</span>
   p <span class="token operator">:=</span> ppFree<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>pp<span class="token punctuation">)</span>
   p<span class="token punctuation">.</span>panicking <span class="token operator">=</span> <span class="token boolean">false</span>
   p<span class="token punctuation">.</span>erroring <span class="token operator">=</span> <span class="token boolean">false</span>
   p<span class="token punctuation">.</span>wrapErrs <span class="token operator">=</span> <span class="token boolean">false</span>
   p<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>p<span class="token punctuation">.</span>buf<span class="token punctuation">)</span>
   <span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>pp<span class="token punctuation">)</span> <span class="token function">free</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 为了让对象池中的缓冲区大小大致相同以便更好的弹性控制缓冲区大小</span>
    <span class="token comment">// 过大的缓冲区就不用放回对象池</span>
	<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>buf<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">64</span><span class="token operator">&lt;&lt;</span><span class="token number">10</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 字段重置后释放对象到池中</span>
	p<span class="token punctuation">.</span>buf <span class="token operator">=</span> p<span class="token punctuation">.</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>
	p<span class="token punctuation">.</span>arg <span class="token operator">=</span> <span class="token boolean">nil</span>
	p<span class="token punctuation">.</span>value <span class="token operator">=</span> reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>wrappedErr <span class="token operator">=</span> <span class="token boolean">nil</span>
	ppFree<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h3><p><code>sync.Map</code>是官方提供的一种并发安全Map的实现，开箱即用，使用起来十分的简单，下面是该结构体对外暴露的方法：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 根据一个key读取值，返回值会返回对应的值和该值是否存在</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">Load</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> <span class="token punctuation">(</span>value any<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span>

<span class="token comment">// 存储一个键值对</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">Store</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span>

<span class="token comment">// 删除一个键值对</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span>

<span class="token comment">// 如果该key已存在，就返回原有的值，否则将新的值存入并返回，当成功读取到值时，loaded为true，否则为false</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">LoadOrStore</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token punctuation">(</span>actual any<span class="token punctuation">,</span> loaded <span class="token builtin">bool</span><span class="token punctuation">)</span>

<span class="token comment">// 删除一个键值对，并返回其原有的值，loaded的值取决于key是否存在</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">LoadAndDelete</span><span class="token punctuation">(</span>key any<span class="token punctuation">)</span> <span class="token punctuation">(</span>value any<span class="token punctuation">,</span> loaded <span class="token builtin">bool</span><span class="token punctuation">)</span>

<span class="token comment">// 遍历Map，当f()返回false时，就会停止遍历</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">Range</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面用一个简单的示例来演示下<code>sync.Map</code>的基本使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> syncMap sync<span class="token punctuation">.</span>Map
	<span class="token comment">// 存入数据</span>
	syncMap<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	syncMap<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>syncMap<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取并删除</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>syncMap<span class="token punctuation">.</span><span class="token function">LoadAndDelete</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 读取或存入</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>syncMap<span class="token punctuation">.</span><span class="token function">LoadOrStore</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	syncMap<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;goodbye world&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// 遍历map</span>
	syncMap<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a true
a true           
hello world false
a hello world    
b goodbye world  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来看一个并发使用map的例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	myMap <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				myMap<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> n
			<span class="token punctuation">}</span>
			wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上例中使用的普通map，开了10个协程不断的存入数据，显然这很可能会触发fatal，结果大概率会如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fatal error: concurrent map writes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code>sync.Map</code>就可以避免这个问题</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> syncMap sync<span class="token punctuation">.</span>Map
	<span class="token keyword">var</span> wait sync<span class="token punctuation">.</span>WaitGroup
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				syncMap<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	syncMap<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>8 8
3 3
1 1
9 9
6 6
5 5
7 7
0 0
2 2
4 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了并发安全肯定需要做出一定的牺牲，<code>sync.Map</code>的性能要比map低10-100倍左右。</p><br><h2 id="原子" tabindex="-1"><a class="header-anchor" href="#原子" aria-hidden="true">#</a> 原子</h2><p>在计算机学科中，原子或原语操作，通常用于表述一些不可再细化分割的操作，由于这些操作无法再细化为更小的步骤，在执行完毕前，不会被其他的任何协程打断，所以执行结果要么成功要么失败，没有第三种情况可言，如果出现了其他情况，那么它就是不是原子操作。例如下方的代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">if</span> a <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		a <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方的代码是一个简单的判断分支，尽管代码很少，但也不是原子操作，真正的原子操作是由硬件指令层面支持的。</p><br><h3 id="类型" tabindex="-1"><a class="header-anchor" href="#类型" aria-hidden="true">#</a> 类型</h3><p>好在大多情况下并不需要自行编写汇编，Go标准库<code>sync/atomic</code>包下已经提供了原子操作相关的API，其提供了以下几种类型以供进行原子操作。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>atomic<span class="token punctuation">.</span>Bool<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Pointer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Int32<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Int64<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Uint32<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Uint64<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Uintptr<span class="token punctuation">{</span><span class="token punctuation">}</span>
atomic<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>Pointer</code>原子类型支持泛型，<code>Value</code>类型支持存储任何类型，除此之外，还提供了许多函数来方便操作。因为原子操作的粒度过细，在大多数情况下，更适合处理这些基础的数据类型。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>atmoic</code>包下原子操作只有函数签名，没有具体实现，具体的实现是由<code>plan9</code>汇编编写。</p></div><br><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><p>每一个原子类型都会提供以下三个方法：</p><ul><li><code>Load()</code>：原子的获取值</li><li><code>Swap(newVal type) (old type)</code>：原子的交换值，并且返回旧值</li><li><code>Store(val type)</code>：原子的存储值</li></ul><p>不同的类型可能还会有其他的额外方法，比如整型类型都会提供<code>Add</code>方法来实现原子加减操作。下面以一个<code>int64</code>类型演示为例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> aint64 atomic<span class="token punctuation">.</span>Uint64
	<span class="token comment">// 存储值</span>
	aint64<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span>
	<span class="token comment">// 交换值</span>
	aint64<span class="token punctuation">.</span><span class="token function">Swap</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span>
	<span class="token comment">// 增加</span>
	aint64<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">112</span><span class="token punctuation">)</span>
    <span class="token comment">// 加载值</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>aint64<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者也可以直接使用函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> aint64 <span class="token builtin">int64</span>
   <span class="token comment">// 存储值</span>
   atomic<span class="token punctuation">.</span><span class="token function">StoreInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>aint64<span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
   <span class="token comment">// 交换值</span>
   atomic<span class="token punctuation">.</span><span class="token function">SwapInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>aint64<span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span>
   <span class="token comment">// 增加</span>
   atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>aint64<span class="token punctuation">,</span> <span class="token number">112</span><span class="token punctuation">)</span>
   <span class="token comment">// 加载</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>atomic<span class="token punctuation">.</span><span class="token function">LoadInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>aint64<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他的类型的使用也是十分类似的，最终输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>240
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h3 id="cas" tabindex="-1"><a class="header-anchor" href="#cas" aria-hidden="true">#</a> CAS</h3><p><code>atmoic</code>包还提供了<code>CompareAndSwap</code>操作，也就是<code>CAS</code>，它是乐观锁的一种典型实现。乐观锁本身并不是锁，是一种并发条件下无锁化并发控制方式。之所以被称作乐观锁，是因为它总是乐观的假设共享数据不会被修改，仅当发现数据未被修改时才会去执行对应操作，而前面了解到的互斥量就是悲观锁，互斥量总是悲观的认为共享数据肯定会被修改，所以在操作时会加锁，操作完毕后就会解锁。由于无锁化实现的并发安全效率相对于锁要高一些，许多并发安全的数据结构都采用了<code>cAS</code>来进行实现，不过真正的效率要结合具体使用场景来看。看下面的一个例子：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> lock sync<span class="token punctuation">.</span>Mutex

<span class="token keyword">var</span> count <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>num <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   count <span class="token operator">+=</span> num
   lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个使用互斥锁的例子，每次增加数字前都会先上锁，执行完毕后就会解锁，过程中会导致其他协程阻塞，接下来使用<code>CAS</code>改造一下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> count <span class="token builtin">int64</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>num <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		expect <span class="token operator">:=</span> atomic<span class="token punctuation">.</span><span class="token function">LoadInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">)</span>
		<span class="token keyword">if</span> atomic<span class="token punctuation">.</span><span class="token function">CompareAndSwapInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>count<span class="token punctuation">,</span> expect<span class="token punctuation">,</span> expect<span class="token operator">+</span>num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于<code>CAS</code>而言，有三个参数，内存值，期望值，新值。执行时，<code>CAS</code>会将期望值与当前内存值进行比较，如果内存值与期望值相同，就会执行后续的操作，否则的话什么也不做。对于Go中<code>atomic</code>包下的原子操作，<code>CAS</code>相关的函数则需要传入地址，期望值，新值，且会返回是否成功替换的布尔值。例如<code>int64</code>类型的<code>CAS </code>操作函数签名如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CompareAndSwapInt64</span><span class="token punctuation">(</span>addr <span class="token operator">*</span><span class="token builtin">int64</span><span class="token punctuation">,</span> old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>swapped <span class="token builtin">bool</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code>CAS</code>的例子中，首先会通过<code>LoadInt64</code>来获取期望值，随后使用<code>CompareAndSwapInt64</code>来进行比较交换，如果不成功的话就不断循环，直到成功。这样无锁化的操作虽然不会导致协程阻塞，但是不断的循环对于CPU而言依旧是一个不小的开销，所以在一些实现中失败达到了一定次数可能会放弃操作。但是对于上面的操作而言，仅仅只是简单的数字相加，涉及到的操作并不复杂，所以完全可以考虑无锁化实现。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>大多数情况下，仅仅只是比较值是无法做到并发安全的，比如因<code>CAS</code>引起ABA问题，就需要使用额外加入<code>version</code>来解决问题。</p></div><h3 id="value" tabindex="-1"><a class="header-anchor" href="#value" aria-hidden="true">#</a> Value</h3><p><code>atomic.Value</code>结构体，可以存储任意类型的值，结构体如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Value <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   <span class="token comment">// any类型</span>
   v any
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管可以存储任意类型，但是它不能存储<code>nil</code>，并且前后存储的值类型应当一致，下面两个例子都无法通过编译</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> val atomic<span class="token punctuation">.</span>Value
   val<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// panic: sync/atomic: store of nil value into Value   </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> val atomic<span class="token punctuation">.</span>Value
   val<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span>
   val<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token number">114154</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// panic: sync/atomic: store of inconsistently typed value into Value </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，它的使用与其他的原子类型并无太大的差别，并且需要注意的是，所有的原子类型都不应该复制值，而是应该使用它们的指针。</p>`,378),o=[c];function i(l,u){return s(),a("div",null,o)}const k=n(e,[["render",i],["__file","110.concurrency.html.vue"]]);export{k as default};
