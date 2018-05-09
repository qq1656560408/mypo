package com.mz.util.shiro;

import org.apache.shiro.crypto.hash.SimpleHash;

public class ShiroEncryption {
	/**
	 * 与shiro配置文件相同
	 */
	private static String hashAlgorithmName = "MD5";
	/**
	 * 与shiro配置文件相同
	 */
	private static int hashIterations = 2000;

	/**
	 * 加密
	 * 
	 * @param password
	 *            明码
	 * @return 加密后的密码
	 */
	public static String encryption(String password) {
		String obj = new SimpleHash(hashAlgorithmName, password, null, hashIterations).toHex();
		return obj;
	}
	
	public static void main(String[] args) {
		String string = encryption("123");
		System.out.println(string);
	}
}
