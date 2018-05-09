package com.mz.util;

import java.util.HashMap;

public class MyConvert {
	public static HashMap<String, Double> map = new HashMap<String, Double>(){

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		{
			/**
			 * 水量单位转换
			 */
			put("立方米",1.0);
			put("十立方米",10.0);
			put("百立方米",100.0);
			put("千立方米",1000.0);
			put("万立方米",10000.0);
			put("十万立方米",100000.0);
			put("百万立方米",1000000.0);
			put("千万立方米",10000000.0);
			put("亿立方米",100000000.0);
			
			//重量
			put("吨",1.0);
			put("十吨",10.0);
			put("百吨",100.0);
			put("千吨",1000.0);
			put("万吨",10000.0);
			put("十万吨",100000.0);
			put("百万吨",1000000.0);
			put("千万吨",10000000.0);
			put("亿吨",100000000.0);
			
			//电量
			put("万千瓦时", 10000.0);
			put("千千瓦时", 1000.0);
			put("百千瓦时", 100.0);
			put("十千瓦时", 10.0);
			put("千瓦时", 1.0);
			put("kWh", 1.0);
			
			
			
			/*put("Hm2",1.0);
			put("hm3", 0.0001);*/
			
			//金额
			put("元", 1.0);
			put("十元", 10.0);
			put("百元", 100.0);
			put("千元", 1000.0);
			put("万元", 10000.0);
			put("十万元", 100000.0);
			put("百万元", 1000000.0);
			put("千万元", 10000000.0);
			put("亿元", 100000000.0);
		}
	};
	
	/**
	 * 转换
	 * @param num
	 * @param dw 
	 * @param todw 
	 * @return
	 */
	public static double convertToDw(double num, String dw, String todw) {
		try{
			double renLen = 0;
			double base1 = map.get(dw);
			double base2 = map.get(todw);
			renLen = num * base1 / base2;
			return renLen;
		}catch (Exception e) {
			e.printStackTrace();
			return num;
		}
		
	}
	
	public static void main(String[] args) {
		double aa = convertToDw(1, "亿元", "元"); 
		System.out.println(aa);
	}
}
