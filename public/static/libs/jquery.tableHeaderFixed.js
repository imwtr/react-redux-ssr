
;(function($) {
    $.fn.tableHeaderFixed = function(options) {
        var defaults = {
            // 表头在页面滚动时固定在头部
            fixedInPage: true,
            // 表头在容器滚动时固定在容器头部
            fixedInContainer: false,
            // 表格容器最大高度 当fixedInContainer为true时生效
            containerMaxHeight: 400,
            // 容器类名
            containerClass: 'table-fixed-content-wrap',
            // 固定表头的类名
            fixedHeaderClass: 'table-fixed-header'
        };

        var opts = $.extend({}, defaults, options),
            $win = $(window);


        this.each(function() {
            var $this = $(this);

            if (opts.fixedInContainer) {
                headerFixedInContainer(getTableContainer($this), $this);
            } else if (opts.fixedInPage) {
                headerFixedInPage($this);
            }
        });

        // 获取元素在相对页面的位置
        function getAbsPosition(elem) {
            if (!elem) {
                return {};
            }

            var left = elem.offsetLeft,
                top = elem.offsetTop;

            while (elem = elem.offsetParent) {
                left += elem.offsetLeft;
                top += elem.offsetTop;
            }

            return {
                left: left,
                top: top
            };
        }

        // 获取表格容器
        function getTableContainer($table) {
            var $container = $table.closest('.' + opts.containerClass);

            if (!$container.length) {
                $container = $('<div class="' + opts.containerClass + '" />').css({
                    overflowY: 'auto',
                    maxHeight: opts.containerMaxHeight
                });

                var $p = $table.parent();

                $p.append($container.append($table));
            }

            return $container;
        }

        // 表格固定在所在容器顶部
        function headerFixedInContainer($container, $table) {
            if ($container[0].scrollHeight <= $container[0].offsetHeight) {
                $container.siblings('.' + opts.fixedHeaderClass).hide();
                return;
            }

            var $fixedHeaderExist = $container.siblings('.' + opts.fixedHeaderClass),
                $fixedHeader = $fixedHeaderExist.length ? $fixedHeaderExist : $table.clone(),
                $thead = $table.find('thead'),
                $tds = $table.find('tr').eq(1).find('td'),
                $ths = $table.find('th');

            $fixedHeader.find('tbody,colgroup').remove();

            if ($thead.is(':visible')) {
                $fixedHeader.find('th').each(function(i) {
                    var h = $ths.eq(i)[0].clientWidth;
                    $(this).attr('width', h);
                });

                $thead.css({
                    visibility: 'hidden'
                });

                $fixedHeader.show();

                setTimeout(function() {
                    $table.css({
                        marginTop: -$fixedHeader.height()
                    });
                }, 0);

            }

            if (!$fixedHeaderExist.length) {
                $container.before($fixedHeader.attr('class', 'table table-center myTable ' + opts.fixedHeaderClass).css({
                    display: 'table',
                    width: 'auto'
                }));
            }

            $win.resize(function() {
                if ($tds.length) {
                    $fixedHeader.find('th').each(function(i) {
                        var h = $tds.eq(i)[0].clientWidth;
                        $(this).attr('width', h);
                    });
                }
            });
        }

        // 表格固定在页面顶部
        function headerFixedInPage($table) {
            var tableOffsetTop = getAbsPosition($table[0]).top,
                tableOffsetHeight = $table.find('tbody')[0].offsetHeight,
                $fixedHeaderExist = $table.siblings('.' + opts.fixedHeaderClass),
                $fixedHeader = $fixedHeaderExist.length ? $fixedHeaderExist : $table.clone(),
                fixedHeaderOffsetHeight = $fixedHeader[0].offsetHeight,
                $thead = $table.find('thead'),
                $tds = $table.find('tr').eq(1).find('td'),
                $ths = $table.find('th');

            $fixedHeader.find('tbody,colgroup').remove();

            if ($thead.is(':visible')) {
                $fixedHeader.find('th').each(function(i) {
                    var h = $ths.eq(i)[0].clientWidth;
                    $(this).attr('width', h);
                });
            }

            if (!$fixedHeaderExist.length) {
                $table.before($fixedHeader.attr('class', 'table table-center myTable ' + opts.fixedHeaderClass).css({
                    position: 'fixed',
                    top: '0',
                    width: 'auto'
                }));
            }

            $win.resize(function() {
                if ($tds.length) {
                    $fixedHeader.find('th').each(function(i) {
                        var h = $tds.eq(i)[0].clientWidth;
                        $(this).attr('width', h);
                    });
                }
            });

            $win.scroll(function() {
                var st = document.body.scrollTop;
                if (st >= tableOffsetTop && st <= tableOffsetTop + tableOffsetHeight) {
                    $thead.css({
                        visibility: 'hidden'
                    });
                    $fixedHeader.show();
                } else {
                    $thead.css({
                        visibility: 'visible'
                    });
                    $fixedHeader.hide();
                }
            });
        }
    };

})(jQuery);

