/**
 * 使用weui.js构建dialog，并弹出
 * https://github.com/Tencent/weui.js/blob/master/docs/component/dialog.md
 */
function showDialog() {
    var $dialog = weui.dialog({
        title: 'dialog标题',
        content: 'dialog内容',
        className: 'custom-classname',
        buttons: [{
            label: '取消',
            type: 'default',
            onClick: function () {
                alert('取消')
            }
        }, {
            label: '确定',
            type: 'primary',
            onClick: function () {
                alert('确定')
            }
        }]
    });
}

/**
 * 利用jQuery直接显示已经通过html构建的dialog
 * 
 */
function showDialog1() {
    $("#dialog1").show();
}

/**
 * 弹出Alert
 */
function showAlert() {
    weui.alert('普通的alert');
}

/**
 * 自定义alert
 */
function showAlert2() {
    weui.alert('自定义按钮的alert', {
        title: '自定义按钮的alert',
        buttons: [{
            label: 'OK',
            type: 'primary',
            onClick: function(){ console.log('ok') }
        }]
    });
}

/**
 *  显示微信专属的一种按钮列表，名叫actionSheet
 */
function showActionSheet(){
    weui.actionSheet(
    [
        {
            label: '拍照',
            onClick: function () {
                console.log('拍照');
            }
        }, {
            label: '从相册选择',
            onClick: function () {
                console.log('从相册选择');
            }
        }, {
            label: '其他',
            onClick: function () {
                console.log('其他');
            }
        }
    ],
    [
        {
            label: '取消',
            onClick: function () {
                console.log('取消');
            }
        }
    ],
    );
}

/**
 * 显示loading的转圈图，此时无法操作页面上的其他内容
 */
function loading(){
    var $loading = weui.loading("载入中...");
    // 因此设置一个计时器，在1秒后因擦干loading，即可重新操作页面内容
    setTimeout(() => {
        $loading.hide();
    }, 1000);
}

/**
 * 显示图片扩大预览，和删除按钮
 * 一把配合上传图片之用
 */
function gallery(self){

    var $self = $(self);

    let url = $self.attr("data-mediaid");
    console.log(url);
    var gallery = weui.gallery(url, {
        className: 'custom-classname',
        onDelete: function(){
            if(confirm('确定删除该图片？')){ console.log('删除'); }
            gallery.hide(function() {
                 console.log('`gallery` has been hidden');
             });
        }
    });
}



/**
 * 弹出类似loading的黑色方框，作用是向用户提示操作成功！
 */
function toast(){
    weui.toast('操作成功', {
        duration: 3000,
        className: 'custom-classname',
        callback: function(){ console.log('close') }
    });
}

/**
 * 在顶部弹出提示tips，向用户提示消息
 * https://github.com/Tencent/weui.js/blob/master/docs/component/topTips.md
 */
function toptip(){
    // 普通提示，默认三秒消失
    // weui.topTips('请填写正确的字段');

    // 可以设置消失的时间（默认3000毫秒）
    // weui.topTips('请填写正确的字段', 1000);

    // 设置消失后的回调函数
    // weui.topTips('请填写正确的字段', function(){ console.log('toptip is closed') });
    
    // 配置多个参数
    weui.topTips('请填写正确的字段', {
        duration: 100,
        className: 'custom-classname',
        callback: function(){ console.log('toptip is closed') }
    });
    
    // // 主动关闭
    // var $topTips = weui.topTips('请填写正确的字段');
    // $topTips.hide(function() {
    //      console.log('`topTips` has been hidden');
    // });
}

/**
 * 图片上传
 * https://github.com/Tencent/weui.js/blob/master/docs/component/uploader.md
 */
function upload(){
    var uploadCount = 0;
    weui.uploader('#uploader', {
       url: 'http://localhost:8081',
       auto: true,
       type: 'file',
       fileVal: 'fileVal',
       compress: {
           width: 1600,
           height: 1600,
           quality: .8
       },

       // 当用户点击+号上传添加文件时，在将文件上传之前每个添加的文件都要回调一次本函数，用作检验上传文件的合法性
       onBeforeQueued: function(files) {
           // `this` 是轮询到的文件, `files` 是所有文件

           // 检查上传的是不是图片
           if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
               weui.alert('请上传图片');
               return false; // 阻止文件添加
           }
           // 检查上传图片的大小
           if(this.size > 10 * 1024 * 1024){
               weui.alert('请上传不超过10M的图片');
               return false;
           }
           // 最多只能允许一次性上传5个图片
           if (files.length > 5) { // 防止一下子选择过多文件
               weui.alert('最多只能上传5张图片，请重新选择');
               return false;
           }
           // uploadCount记录总共上传的文件数量
           if (uploadCount + 1 > 5) {
               weui.alert('最多只能上传5张图片');
               return false;
           }
    
           ++uploadCount;
    
           // return true; // 阻止默认行为，不插入预览图的框架
       },

       /**
        * 通过onBeforeQueued()校验后，会回调本方法，通常用于
        * （1）获取上传相关的信息：例如当前文件状态、编码方式等
        * （2）手动执行上传：如果设置auto=false，则这里需要显示调用this.upload()才会执行上传操作
        * （3）因为某种原因终止上传： this.stop();
        */
       onQueued: function(){
           console.log(this);
    
           // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
           // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
    
           // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
           // this.stop(); // 中断上传
    
           // return true; // 阻止默认行为，不显示预览图的图像
       },

       onBeforeSend: function(data, headers){
           console.log(this, data, headers);
           // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
           // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
    
           // return false; // 阻止文件上传
       },
       // 图片上传过程中的回调，用来告知上传进度的百分比
       onProgress: function(procent){
           console.log(this, procent);
           // return true; // 阻止默认行为，不使用默认的进度显示
       },
       // 图片上传成功
       onSuccess: function (ret) {
           console.log(this, ret);
           // return true; // 阻止默认行为，不使用默认的成功态
       },
       // 图片上传失败
       onError: function(err){
           console.log(this, err);
           // return true; // 阻止默认行为，不使用默认的失败态
       }
    });
}