function init(url, name) {
    //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
    Handlebars.registerHelper("addOne", function (index, options) {
        return parseInt(index) + 1;
    });

    // 计算结果函数
    var calculate = (function (page) {

        function _calculate(el, num) {
            var count = parseInt(el.html()) + parseInt(num);
            el.html(count);

            return count;
        }

        return function (param) {
            if (param.right == 1) {
                var result = _calculate(page.right, 1);
                page.score.html(result);
            } else {
                _calculate(page.wrong, 1);
            }
        }
    })({
        right: $('#right'),
        wrong: $('#wrong'),
        score: $('#score')
    });

    //获取数据
    $.get(url, function (data) {
        // 取得模板
        var tmpl = $('#tmpl').html();
        // 编译模板
        var html = Handlebars.compile(tmpl)(data[name]);
        // 插入编译好的html
        $('#app').append(html);
        //显示总数
        var LEN = $('[data-question]').length;
        $('#total').html(LEN);

        //正对填空题的修正--直接显示答案
        $('[data-question]').map(function (item, index) {
            var _item = $(this).find('[data-item]');
            if (!_item || _item.length == 0) {
                $(this).find('[data-item-answer]').css({
                    'visibility': 'visible',
                    'color': '#04be02'
                });
            }
        });

        //添加点击事件
        $('body').on('click', '[data-item]', function () {

            //拿到题目元素
            var parent = $(this).parents('[data-question]');

            // 判断是否已经被点击过了   start
            var selected = parent.data('selected');
            if (selected) {
                return false;
            }
            parent.data('selected', true);
            // 判断是否已经被点击过了   end

            // 实时计算剩余题目个数
            $('#total').html(--LEN);

            var choice = $(this).data('item');
            var answer = $(this).data('answer');

            // 判断选择是否正确  start
            if (choice === answer) {
                $(this).addClass('active');
                calculate({
                    right: 1
                });
                // 显示正确答案
                parent.find('[data-item-answer]').css({
                    'visibility': 'visible',
                    'color': '#04be02'
                });
            } else {
                $(this).addClass('error');
                calculate({
                    wrong: 1
                });
                // 显示正确答案
                parent.find('[data-item-answer]').css({
                    'visibility': 'visible',
                    'color': '#f00'
                });
            }
            // 判断选择是否正确  end

        });
    });
}