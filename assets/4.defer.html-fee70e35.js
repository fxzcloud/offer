import{_ as n,V as s,W as a,$ as e}from"./framework-8edddef6.js";const p={},t=e(`<h1 id="defer" tabindex="-1"><a class="header-anchor" href="#defer" aria-hidden="true">#</a> defer</h1><p><code>defer</code>在go的日常开发中是一个出现频率非常高的关键字，它会以先进后出的方式来执行<code>defer</code>关联的函数，很多时候我们利用这种机制来进行一些资源的释放操作，比如文件关闭之类的操作。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>fd<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;/dev/stdin&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> err
<span class="token punctuation">}</span>
<span class="token keyword">defer</span> fd<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此高频出现的关键字，使得我们有必要去了解一下它背后的结构。</p><h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2><p><code>defer</code>关键字对应<code>runtime._defer</code>结构体，它的结构并不复杂</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> _defer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	started <span class="token builtin">bool</span>
	heap    <span class="token builtin">bool</span>
	openDefer <span class="token builtin">bool</span>
	sp        <span class="token builtin">uintptr</span> <span class="token comment">// sp at time of defer</span>
	pc        <span class="token builtin">uintptr</span> <span class="token comment">// pc at time of defer</span>
	fn        <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// can be nil for open-coded defers</span>
	_panic    <span class="token operator">*</span>_panic <span class="token comment">// panic that is running defer</span>
	link      <span class="token operator">*</span>_defer <span class="token comment">// next defer on G; can point to either heap or stack!</span>
	fd   unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// funcdata for the function associated with the frame</span>
	varp <span class="token builtin">uintptr</span>        <span class="token comment">// value of varp for the stack frame</span>
	framepc <span class="token builtin">uintptr</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的<code>fn</code>字段是<code>defer</code>关键字对应的函数，<code>link</code>表示下一个链接的<code>defer</code>，<code>sp</code>和<code>pc</code>记录了调用方的函数信息，用于判断<code>defer</code>属于哪一个函数。defer在运行时以链表的形式存在，链表的头部就在协程G上，所以<code>defer</code>实际上是与协程直接关联的。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> g <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
	_panic    <span class="token operator">*</span>_panic <span class="token comment">// innermost panic - offset known to liblink</span>
	_defer    <span class="token operator">*</span>_defer <span class="token comment">// innermost defer</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当协程执行函数时，就会按照顺序将函数中的<code>defer</code>从链表的头部加入</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">defer</span> <span class="token function">fn1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> <span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> <span class="token function">fn3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面那段代码就对应这幅图</p><img src="https://public-1308755698.cos.ap-chongqing.myqcloud.com//img/202401271603913.png" style="zoom:67%;"><p>除了协程之外，P也跟<code>defer</code>有一定的关联，在P的结构体中，有一个<code>deferpool</code>字段，如所示。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> p <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
	deferpool    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>_defer <span class="token comment">// pool of available defer structs (see panic.go)</span>
	deferpoolbuf <span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token operator">*</span>_defer
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deferpool</code>中存放着预分配好的<code>defer</code>结构，用于给与P关联的协程G分配新的<code>defer</code>结构，可以减少开销。</p><h2 id="分配" tabindex="-1"><a class="header-anchor" href="#分配" aria-hidden="true">#</a> 分配</h2><p>在语法上对<code>defer</code>关键字的使用，编译器会将其转为为对<code>runtime.deferproc</code>函数的调用。比如go代码是这样写的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">defer</span> <span class="token function">fn1</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而编译后实际上的代码是这样的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token function">deferproc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token function">fn1</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以实际上<code>defer</code>传入的函数是没有参数也没有返回值的，<code>deferproc</code>函数代码如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">deferproc</span><span class="token punctuation">(</span>fn <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	gp <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	d <span class="token operator">:=</span> <span class="token function">newdefer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	d<span class="token punctuation">.</span>link <span class="token operator">=</span> gp<span class="token punctuation">.</span>_defer
	gp<span class="token punctuation">.</span>_defer <span class="token operator">=</span> d
	d<span class="token punctuation">.</span>fn <span class="token operator">=</span> fn
	d<span class="token punctuation">.</span>pc <span class="token operator">=</span> <span class="token function">getcallerpc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	d<span class="token punctuation">.</span>sp <span class="token operator">=</span> <span class="token function">getcallersp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">return0</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数负责创建<code>defer</code>结构并将其加入协程G链表的头部，其中的<code>runtime.newdefer</code>函数就会尝试从P中的<code>deferpool</code>来获取预分配的<code>defer</code>结构。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> sched<span class="token punctuation">.</span>deferpool <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>deferlock<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">cap</span><span class="token punctuation">(</span>pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span> <span class="token operator">&amp;&amp;</span> sched<span class="token punctuation">.</span>deferpool <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        d <span class="token operator">:=</span> sched<span class="token punctuation">.</span>deferpool
        sched<span class="token punctuation">.</span>deferpool <span class="token operator">=</span> d<span class="token punctuation">.</span>link
        d<span class="token punctuation">.</span>link <span class="token operator">=</span> <span class="token boolean">nil</span>
        pp<span class="token punctuation">.</span>deferpool <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">,</span> d<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sched<span class="token punctuation">.</span>deferlock<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它首先会从全局的<code>sched.deferpool</code>向局部的<code>deferpool</code>装填一半的<code>defer</code>结构，然后再从P中的<code>deferpool</code>尝试去获取</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">)</span><span class="token punctuation">;</span> n <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    d <span class="token operator">=</span> pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
    pp<span class="token punctuation">.</span>deferpool <span class="token operator">=</span> pp<span class="token punctuation">.</span>deferpool<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> d <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token comment">// Allocate new defer.</span>
    d <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>_defer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
d<span class="token punctuation">.</span>heap <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后实在找不到才会使用手动分配的方式。最后可以看到有这么一段代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>d<span class="token punctuation">.</span>heap <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这表示<code>defer</code>在堆上分配，相应的当其为<code>false</code>时，就会在栈上分配，栈上分配的内存会在返回时自动回收，其内存管理效率要比在堆上更高，而决定是否在栈上分配的因素就是循环层数，这部分逻辑可以追溯到<code>cmd/compile/ssagen</code>中的<code>escape.goDeferStmt</code>方法的这一小段，如下所示</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>escape<span class="token punctuation">)</span> <span class="token function">goDeferStmt</span><span class="token punctuation">(</span>n <span class="token operator">*</span>ir<span class="token punctuation">.</span>GoDeferStmt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
	<span class="token keyword">if</span> n<span class="token punctuation">.</span><span class="token function">Op</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> ir<span class="token punctuation">.</span>ODEFER <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>loopDepth <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		k <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">later</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">discardHole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		n<span class="token punctuation">.</span><span class="token function">SetEsc</span><span class="token punctuation">(</span>ir<span class="token punctuation">.</span>EscNever<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>e.loopDepth</code>表示的就是当前语句的循环层数，如果当前<code>defer</code>语句不在循环中，就会将其分配到栈上。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">case</span> ir<span class="token punctuation">.</span>ODEFER<span class="token punctuation">:</span>
		n <span class="token operator">:=</span> n<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>ir<span class="token punctuation">.</span>GoDeferStmt<span class="token punctuation">)</span>
		<span class="token keyword">if</span> s<span class="token punctuation">.</span>hasOpenDefers <span class="token punctuation">{</span>
			s<span class="token punctuation">.</span><span class="token function">openDeferRecord</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>Call<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>ir<span class="token punctuation">.</span>CallExpr<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			d <span class="token operator">:=</span> callDefer
			<span class="token keyword">if</span> n<span class="token punctuation">.</span><span class="token function">Esc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> ir<span class="token punctuation">.</span>EscNever <span class="token punctuation">{</span>
				d <span class="token operator">=</span> callDeferStack
			<span class="token punctuation">}</span>
			s<span class="token punctuation">.</span><span class="token function">callResult</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>Call<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>ir<span class="token punctuation">.</span>CallExpr<span class="token punctuation">)</span><span class="token punctuation">,</span> d<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是在栈上分配的话，就会直接在栈上创建<code>defer</code>结构体，最终会由<code>runtime.deferprocStack</code>函数来完成<code>defer</code>结构的创建。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">if</span> k <span class="token operator">==</span> callDeferStack <span class="token punctuation">{</span>
		<span class="token comment">// Make a defer struct d on the stack.</span>
		<span class="token keyword">if</span> stksize <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			s<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;deferprocStack with non-zero stack size %d: %v&quot;</span><span class="token punctuation">,</span> stksize<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		t <span class="token operator">:=</span> <span class="token function">deferstruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token operator">...</span>
		<span class="token comment">// Call runtime.deferprocStack with pointer to _defer record.</span>
		ACArgs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ACArgs<span class="token punctuation">,</span> types<span class="token punctuation">.</span>Types<span class="token punctuation">[</span>types<span class="token punctuation">.</span>TUINTPTR<span class="token punctuation">]</span><span class="token punctuation">)</span>
		aux <span class="token operator">:=</span> ssa<span class="token punctuation">.</span><span class="token function">StaticAuxCall</span><span class="token punctuation">(</span>ir<span class="token punctuation">.</span>Syms<span class="token punctuation">.</span>DeferprocStack<span class="token punctuation">,</span> s<span class="token punctuation">.</span>f<span class="token punctuation">.</span>ABIDefault<span class="token punctuation">.</span><span class="token function">ABIAnalyzeTypes</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">,</span> ACArgs<span class="token punctuation">,</span> ACResults<span class="token punctuation">)</span><span class="token punctuation">)</span>
		callArgs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>callArgs<span class="token punctuation">,</span> addr<span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">mem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		call <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">newValue0A</span><span class="token punctuation">(</span>ssa<span class="token punctuation">.</span>OpStaticLECall<span class="token punctuation">,</span> aux<span class="token punctuation">.</span><span class="token function">LateExpansionResultType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> aux<span class="token punctuation">)</span>
		call<span class="token punctuation">.</span><span class="token function">AddArgs</span><span class="token punctuation">(</span>callArgs<span class="token operator">...</span><span class="token punctuation">)</span>
		call<span class="token punctuation">.</span>AuxInt <span class="token operator">=</span> <span class="token function">int64</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span>PtrSize<span class="token punctuation">)</span> <span class="token comment">// deferprocStack takes a *_defer arg</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deferprocStack</code>函数的签名如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">deferprocStack</span><span class="token punctuation">(</span>d <span class="token operator">*</span>_defer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其具体的创建逻辑与<code>deferproc</code>并无太大区别，主要的区别在于，在栈上分配时是<code>defer</code>结构的来源是直接创建的结构体，在堆上分配的<code>defer</code>来源是<code>new</code>函数。</p><h2 id="执行" tabindex="-1"><a class="header-anchor" href="#执行" aria-hidden="true">#</a> 执行</h2><p>当函数将要返回或者发生<code>panic</code>时，便会进入<code>runtime.deferreturn</code>函数，它负责从协程的链表中取出<code>defer</code>并执行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">deferreturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	gp <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		d <span class="token operator">:=</span> gp<span class="token punctuation">.</span>_defer
		sp <span class="token operator">:=</span> <span class="token function">getcallersp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> d<span class="token punctuation">.</span>sp <span class="token operator">!=</span> sp <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		fn <span class="token operator">:=</span> d<span class="token punctuation">.</span>fn
		d<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token boolean">nil</span>
		gp<span class="token punctuation">.</span>_defer <span class="token operator">=</span> d<span class="token punctuation">.</span>link
		<span class="token function">freedefer</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
		<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先会通过<code>getcallersp()</code>获取当前函数的栈帧并与<code>defer</code>结构中的<code>sp</code>做比较来判断<code>defer</code>是否属于当前函数，然后将<code>defer</code>结构从链表头部取出，并使用<code>gp._defer = d.link</code>执行下一个<code>defer</code>，再通过<code>runtuime.freedefer</code>函数将<code>defer</code>结构释放回池中，最后再调用<code>fn</code>执行，就这样一直循环到执行完属于当前函数的所有<code>defer</code>结束为止。</p><h2 id="开放编码" tabindex="-1"><a class="header-anchor" href="#开放编码" aria-hidden="true">#</a> 开放编码</h2><p><code>defer</code>的使用并非毫无成本，虽然它在语法上给我们提供了便利，但毕竟它不是直接进行函数调用，中间会进行经过一系列的过程，所以还是会造成性能损耗，所以后来go官方设计了一种优化方——开放编码，它是一种对<code>defer</code>的优化方式，其原英文名叫open-coded，国内基本上都给翻译成了开放编码，这里的open指的是展开的意思，就是将<code>defer</code>函数的代码展开到当前函数代码中，就像函数内联一样。这种优化方式有以下几个限制条件</p><ol><li>函数中的<code>defer</code>数量不能超过8个</li><li><code>defer</code>与<code>return</code>两者数量的乘积不能超过15</li><li><code>defer</code>不能出现在循环中</li><li>未禁用编译优化</li><li>没有手动调用<code>os.Exit()</code></li><li>不需要从堆上复制参数</li></ol><p>这部分判断逻辑可以追溯到<code>cmd/compile/ssagen.buildssa</code>函数的下面这部分代码</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">=</span> base<span class="token punctuation">.</span>Flag<span class="token punctuation">.</span>N <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>hasdefer <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>s<span class="token punctuation">.</span>curfn<span class="token punctuation">.</span><span class="token function">OpenCodedDeferDisallowed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>curfn<span class="token punctuation">.</span>Exit<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> s<span class="token punctuation">.</span>hasOpenDefers <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> f <span class="token operator">:=</span> <span class="token keyword">range</span> s<span class="token punctuation">.</span>curfn<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Results</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FieldSlice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token operator">!</span>f<span class="token punctuation">.</span>Nname<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>ir<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">OnStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>curfn<span class="token punctuation">.</span>NumReturns<span class="token operator">*</span>s<span class="token punctuation">.</span>curfn<span class="token punctuation">.</span>NumDefers <span class="token operator">&gt;</span> <span class="token number">15</span> <span class="token punctuation">{</span>
    s<span class="token punctuation">.</span>hasOpenDefers <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后go会在当前函数创建一个8位整数变量<code>deferBits</code>来当作bitmap用于标记<code>defer</code>，每一位标记一个，8位整数<code>uint8</code>最多表示8个，如果对应位为1，那么对应的开放编码优化后的<code>defer</code>就会在函数要返回时执行。</p>`,48),o=[t];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","4.defer.html.vue"]]);export{d as default};
