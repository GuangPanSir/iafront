(function (win) {
            var doc = win.document;
            var docEL = doc.documentElement;
            var tid;

            function refreshRem() {
                var width = docEL.getBoundingClientRect().width;
                if (width > 640) {
                    width = 640;
                }
                
                /*设计1rem等于设计稿中的100px的值*/
                var rem = width / 6.4;
                docEL.style.fontSize = rem + 'px';
            }

            win.addEventListener('resize', function () {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }, false);

            win.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }
            }, false)

            refreshRem();

        }
)(window);