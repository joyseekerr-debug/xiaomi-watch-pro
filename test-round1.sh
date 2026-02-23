#!/bin/bash
# 第1轮测试：基础功能测试

echo "========================================"
echo "第1轮测试：基础功能测试"
echo "========================================"
echo ""

PAGE_URL="https://xiaomi-watch-pro.pages.dev"
TEST_LOG="/tmp/test_round1.log"
> $TEST_LOG

# 测试1: 页面可访问性
echo "【测试1】页面可访问性..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PAGE_URL")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ PASS - HTTP 200"
    echo "TEST1: PASS" >> $TEST_LOG
else
    echo "❌ FAIL - HTTP $HTTP_STATUS"
    echo "TEST1: FAIL" >> $TEST_LOG
fi

# 测试2: 无模板语法
echo "【测试2】检查Vue模板语法..."
PAGE_CONTENT=$(curl -s "$PAGE_URL")
if echo "$PAGE_CONTENT" | grep -q '{{'; then
    echo "❌ FAIL - 发现未渲染的模板语法"
    echo "$PAGE_CONTENT" | grep '{{' | head -3
    echo "TEST2: FAIL" >> $TEST_LOG
else
    echo "✅ PASS - 无模板语法"
    echo "TEST2: PASS" >> $TEST_LOG
fi

# 测试3: 版本号显示
echo "【测试3】检查版本号..."
if echo "$PAGE_CONTENT" | grep -q "v1\.2\.4"; then
    echo "✅ PASS - 版本号 v1.2.4 正确显示"
    echo "TEST3: PASS" >> $TEST_LOG
else
    echo "❌ FAIL - 版本号未显示或错误"
    echo "页面中的版本信息:"
    echo "$PAGE_CONTENT" | grep -o "v[0-9]\.[0-9]\.[0-9]" | head -1
    echo "TEST3: FAIL" >> $TEST_LOG
fi

# 测试4: 标题显示
echo "【测试4】检查页面标题..."
if echo "$PAGE_CONTENT" | grep -q "小米股票智能监控"; then
    echo "✅ PASS - 标题正确"
    echo "TEST4: PASS" >> $TEST_LOG
else
    echo "❌ FAIL - 标题缺失"
    echo "TEST4: FAIL" >> $TEST_LOG
fi

# 测试5: 响应时间
echo "【测试5】响应时间测试..."
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$PAGE_URL")
echo "响应时间: ${RESPONSE_TIME}s"
if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
    echo "✅ PASS - 响应时间正常"
    echo "TEST5: PASS" >> $TEST_LOG
else
    echo "⚠️ WARN - 响应时间较慢"
    echo "TEST5: WARN" >> $TEST_LOG
fi

echo ""
echo "========================================"
echo "第1轮测试结果"
echo "========================================"
cat $TEST_LOG
echo ""

PASS=$(grep -c "PASS" $TEST_LOG)
FAIL=$(grep -c "FAIL" $TEST_LOG)
WARN=$(grep -c "WARN" $TEST_LOG)

echo "统计: $PASS 通过, $FAIL 失败, $WARN 警告"

if [ "$FAIL" -gt 0 ]; then
    echo "❌ 第1轮测试未通过，需要修复"
    exit 1
else
    echo "✅ 第1轮测试通过"
    exit 0
fi
