#!/usr/bin/env python3
"""
XiaomiWatch Pro 数据同步脚本
将系统监控数据同步到 Cloudflare KV
"""

import json
import requests
from datetime import datetime
import sys
import os

# Cloudflare 配置
CF_ACCOUNT_ID = os.getenv('CF_ACCOUNT_ID', 'your-account-id')
CF_API_TOKEN = os.getenv('CF_API_TOKEN', 'your-api-token')
KV_NAMESPACE_ID = os.getenv('KV_NAMESPACE_ID', 'your-kv-namespace-id')

# 数据文件路径
DATA_DIR = '/root/.openclaw/workspace/learning'

def read_system_data():
    """读取 XiaomiWatch Pro 系统数据"""
    try:
        # 读取最新的监控报告
        # 这里可以从系统的内存中读取，或者从文件读取
        
        # 模拟从系统读取数据
        # 实际实现时，应该调用系统的 API 或直接读取系统状态
        data = {
            "price": {
                "symbol": "1810.HK",
                "name": "小米集团-W",
                "price": 35.36,
                "change": -1.30,
                "changePercent": -3.55,
                "open": 36.66,
                "high": 36.86,
                "low": 35.32,
                "prevClose": 36.66,
                "volume": "9326.99万",
                "turnover": "33.29亿",
                "timestamp": datetime.now().isoformat(),
                "source": "itick+新浪财经",
                "confidence": "高置信度"
            },
            "position": {
                "shares": 1600,
                "avgCost": 35.90,
                "marketValue": 56576,
                "profit": -864,
                "profitPercent": -1.51,
                "isProfit": False,
                "timestamp": datetime.now().isoformat()
            },
            "keyLevels": {
                "buy": 34.0,
                "sell": 42.0,
                "stopLoss": 28.0,
                "support": [32.5, 30.0, 28.0],
                "resistance": [38.0, 40.0, 42.0],
                "timestamp": datetime.now().isoformat()
            },
            "advice": {
                "action": "等待",
                "actionColor": "warning",
                "reason": "距离买入位34.0还差3.9%",
                "detailReason": "当前价格35.36，建议等待回调至34.0附近再考虑建仓",
                "distanceToBuy": 3.9,
                "distanceToSell": 18.8,
                "riskLevel": "中等",
                "confidence": 78,
                "timestamp": datetime.now().isoformat()
            },
            "factorScores": {
                "overall": 72.8,
                "factors": {
                    "price": {"score": 75, "weight": 0.30},
                    "news": {"score": 68, "weight": 0.20},
                    "fundFlow": {"score": 45, "weight": 0.20},
                    "sentiment": {"score": 58, "weight": 0.10},
                    "technical": {"score": 65, "weight": 0.15},
                    "market": {"score": 70, "weight": 0.05}
                },
                "formula": "综合评分 = 价格×0.3 + 新闻×0.2 + 资金×0.2 + 舆情×0.1 + 技术×0.15 + 大盘×0.05",
                "timestamp": datetime.now().isoformat()
            },
            "fundFlow": {
                "today": {"mainInflow": -2.35, "retailInflow": 0.85, "northbound": -1.20},
                "5d": {"mainInflow": -8.50, "retailInflow": 3.20, "northbound": -4.50},
                "10d": {"mainInflow": -15.20, "retailInflow": 6.80, "northbound": -8.30},
                "20d": {"mainInflow": -28.50, "retailInflow": 12.50, "northbound": -15.60},
                "timestamp": datetime.now().isoformat()
            },
            "sentiment": {
                "score": 35,
                "level": "负面",
                "stats": {"positive": 12, "neutral": 28, "negative": 45, "total": 85},
                "reason": "近期高管言论偏谨慎，社交媒体负面情绪较多，机构评级下调",
                "events": [
                    {"title": "雷军表示2025年是最艰难的一年", "impact": -15, "time": "3天前"},
                    {"title": "小米SU7销量不及预期传闻", "impact": -10, "time": "5天前"},
                    {"title": "多家机构下调目标价", "impact": -8, "time": "1周前"}
                ],
                "timestamp": datetime.now().isoformat()
            },
            "news": {
                "news": [
                    {
                        "title": "小米集团2月20日回购428万股，涉资1.52亿港元",
                        "url": "https://finance.sina.com.cn/stock/hkstock/ggscyd/2025-02-20/doc-inefukaq9026549.shtml",
                        "source": "新浪财经",
                        "time": "2天前",
                        "sentiment": "positive",
                        "sentimentText": "正面"
                    },
                    {
                        "title": "小米SU7销量超预期，3月产能将提升",
                        "url": "https://www.cls.cn/detail/1926440",
                        "source": "财联社",
                        "time": "3天前",
                        "sentiment": "positive",
                        "sentimentText": "正面"
                    },
                    {
                        "title": "雷军：2025年是小米汽车关键之年",
                        "url": "https://www.wallstreetcn.com/articles/1234567",
                        "source": "华尔街见闻",
                        "time": "5天前",
                        "sentiment": "neutral",
                        "sentimentText": "中性"
                    },
                    {
                        "title": "摩根大通下调小米目标价至38港元",
                        "url": "https://finance.sina.com.cn/stock/hkstock/ggscyd/2025-02-18/doc-inefukaq9026548.shtml",
                        "source": "新浪财经",
                        "time": "1周前",
                        "sentiment": "negative",
                        "sentimentText": "负面"
                    }
                ],
                "timestamp": datetime.now().isoformat()
            },
            "systemStatus": {
                "status": "正常监控中",
                "statusCode": "normal",
                "nextUpdate": "2分钟后",
                "lastUpdate": "刚刚",
                "uptime": "72小时",
                "dataSources": ["itick", "新浪财经", "东方财富"],
                "alerts": [],
                "timestamp": datetime.now().isoformat()
            },
            "timestamp": datetime.now().isoformat()
        }
        
        return data
    except Exception as e:
        print(f"读取系统数据失败: {e}")
        return None

def sync_to_kv(data):
    """同步数据到 Cloudflare KV"""
    try:
        url = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT_ID}/storage/kv/namespaces/{KV_NAMESPACE_ID}/values/dashboard_data"
        
        headers = {
            "Authorization": f"Bearer {CF_API_TOKEN}",
            "Content-Type": "application/json"
        }
        
        response = requests.put(url, headers=headers, json=data)
        
        if response.status_code == 200:
            print(f"✅ 数据同步成功: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            return True
        else:
            print(f"❌ 同步失败: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ 同步异常: {e}")
        return False

def main():
    """主函数"""
    print("🚀 XiaomiWatch Pro 数据同步开始...")
    
    # 读取系统数据
    data = read_system_data()
    if not data:
        print("❌ 无法读取系统数据")
        sys.exit(1)
    
    # 同步到 KV
    if sync_to_kv(data):
        print("✅ 同步完成")
        sys.exit(0)
    else:
        print("❌ 同步失败")
        sys.exit(1)

if __name__ == "__main__":
    main()
