#!/bin/bash
# XiaomiWatch Pro 系统性测试脚本
# 版本: 1.0.0
# 日期: 2025-02-23

echo "========================================"
echo "XiaomiWatch Pro 系统性测试"
echo "========================================"
echo ""

# 配置
PAGE_URL="https://xiaomi-watch-pro.pages.dev"
API_URL="https://xiaomi-watch-pro-api.joyseekerr.workers.dev"
TEST_RESULTS="/tmp/xiaomi_test_results.log"

# 清空测试结果
> $TEST_RESULTS

echo "【测试1】页面可访问性测试"
echo "----------------------------------------"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $PAGE_URL)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ 页面可访问 (HTTP 200)"
    echo "TEST1: PASS" >> $TEST_RESULTS
else
    echo "❌ 页面访问失败 (HTTP $HTTP_STATUS)"
    echo "TEST1: FAIL" >> $TEST_RESULTS
fi
echo ""

echo "【测试2】API 可访问性测试"
echo "----------------------------------------"
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/dashboard")
if [ "$API_STATUS" = "200" ]; then
    echo "✅ API 可访问 (HTTP 200)"
    echo "TEST2: PASS" >> $TEST_RESULTS
else
    echo "❌ API 访问失败 (HTTP $API_STATUS)"
    echo "TEST2: FAIL" >> $TEST_RESULTS
fi
echo ""

echo "【测试3】API 数据完整性测试"
echo "----------------------------------------"
API_RESPONSE=$(curl -s "$API_URL/api/dashboard")
if echo "$API_RESPONSE" | grep -q '"price"'; then
    echo "✅ API 返回包含 price 数据"
    echo "TEST3: PASS" >> $TEST_RESULTS
else
    echo "❌ API 数据不完整"
    echo "TEST3: FAIL" >> $TEST_RESULTS
fi
echo ""

echo "【测试4】页面内容完整性测试"
echo "----------------------------------------"
PAGE_CONTENT=$(curl -s $PAGE_URL)
if echo "$PAGE_CONTENT" | grep -q "小米股票智能监控"; then
    echo "✅ 页面标题正确"
    echo "TEST4: PASS" >> $TEST_RESULTS
else
    echo "❌ 页面标题缺失"
    echo "TEST4: FAIL" >> $TEST_RESULTS
fi
echo ""

echo "【测试5】Vue 渲染测试"
echo "----------------------------------------"
# 检查是否还有未渲染的模板语法
if echo "$PAGE_CONTENT" | grep -q '{{'; then
    echo "⚠️  页面包含未渲染的 Vue 模板语法"
    echo "TEST5: WARN" >> $TEST_RESULTS
else
    echo "✅ Vue 模板已正确渲染"
    echo "TEST5: PASS" >> $TEST_RESULTS
fi
echo ""

echo "【测试6】版本信息显示测试"
echo "----------------------------------------"
if echo "$PAGE_CONTENT" | grep -q "v1.2.2"; then
    echo "✅ 页面版本号正确显示 (v1.2.2)"
    echo "TEST6: PASS" >> $TEST_RESULTS
else
    echo "❌ 页面版本号未显示"
    echo "TEST6: FAIL" >> $TEST_RESULTS
fi
echo ""

echo "【测试7】响应时间测试"
echo "----------------------------------------"
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" $PAGE_URL)
echo "页面加载时间: ${RESPONSE_TIME}s"
if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
    echo "✅ 响应时间正常 (< 3s)"
    echo "TEST7: PASS" >> $TEST_RESULTS
else
    echo "⚠️  响应时间较慢 (> 3s)"
    echo "TEST7: WARN" >> $TEST_RESULTS
fi
echo ""

echo "========================================"
echo "测试完成"
echo "========================================"
echo ""
echo "详细结果:"
cat $TEST_RESULTS
echo ""

# 统计
PASS_COUNT=$(grep -c "PASS" $TEST_RESULTS)
FAIL_COUNT=$(grep -c "FAIL" $TEST_RESULTS)
WARN_COUNT=$(grep -c "WARN" $TEST_RESULTS)

echo "统计: $PASS_COUNT 通过, $FAIL_COUNT 失败, $WARN_COUNT 警告"
echo ""

if [ "$FAIL_COUNT" -gt 0 ]; then
    echo "❌ 测试未通过，需要修复"
    exit 1
else
    echo "✅ 测试通过"
    exit 0
fi
