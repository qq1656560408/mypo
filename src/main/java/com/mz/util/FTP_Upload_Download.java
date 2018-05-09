package com.mz.util;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author admin
 * 
 */
@Component
public class FTP_Upload_Download {

	// 读取ftp.property文件属性值

	/**
	 * 主机ip
	 */
	@Value("${localhost}")
	private String localhost;

	/**
	 * 上传端口
	 */
	@Value("${port}")
	private int port;

	/**
	 * 用户名
	 */
	@Value("${ftpUserName}")
	private String ftpUserName;

	/**
	 * 密码
	 */
	@Value("${ftpPassword}")
	private String ftpPassword;

	/**
	 * 默认地址
	 */
	@Value("${ftpPath}")
	private String ftpPath;
	
	/**
	 * ftp查看端口
	 */
	@Value("${ftpLookPort}")
	String lookPort;
	/**
	 * ftp查看链接
	 */
	@Value ("${ftpLookUrl}")
	String ftpLookUrl;
	
	/**
	 * 遥感路径
	 */
	@Value("${remoteSensingFilePath}")
	String remoteSensingFilePath;
	

	@Value("${folderName}")
	String folderName;

	@Value("${processFilePath}")
	String processFilePath;



	/**
	 * 获取FTPClict对象
	 * 
	 * @param localhost
	 *            主机
	 * @param port
	 *            端口
	 * @param ftpUserName
	 *            ftp用户名
	 * @param ftpPasswork
	 *            ftp密码
	 * @param ftpPath
	 *            ftp工作路径
	 * @return
	 */
	private FTPClient getFTPClient(String localhost, int port, String ftpUserName, String ftpPasswork, String ftpPath) {
		FTPClient ftpClient = new FTPClient();
		try {
			// 连接ftp
			ftpClient.connect(localhost, port);
			ftpClient.login(ftpUserName, ftpPasswork);
			int reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				// 取消连接
				ftpClient.disconnect();
				return null;
			}
			// 中文支持
			ftpClient.setControlEncoding("UTF-8");
			// 二进制
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			ftpClient.enterLocalPassiveMode();
			ftpClient.changeWorkingDirectory(ftpPath);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return ftpClient;
	}

	/**
	 * ftp上传
	 * 
	 * @param fileName
	 *            保存ftp文件名称
	 * @param file
	 *            要上传的文件
	 */
	public boolean upload(String fileName, InputStream input,String ftpPath) {
		FTPClient ftpClient = getFTPClient(localhost, port, ftpUserName, ftpPassword, ftpPath);
		try {
			// 切换到上传目录
			if (!ftpClient.changeWorkingDirectory(ftpPath)) {
				// 如果目录不存在创建目录
				String[] dirs = ftpPath.split("/");
				String tempPath = "";
				for (String dir : dirs) {
					if (null == dir || "".equals(dir)) {
						continue;
					}

					tempPath += "/" + dir;
					if (!ftpClient.changeWorkingDirectory(tempPath)) {
						ftpClient.makeDirectory(tempPath);
						ftpClient.changeWorkingDirectory(tempPath);
					}
				}
			}
			System.out.println(ftpPath);
			System.out.println(ftpClient.printWorkingDirectory());
			fileName=new String(fileName.getBytes("GBK"),"iso-8859-1");
			// 上传文件
			boolean b=ftpClient.storeFile(fileName, input);
			System.out.println(ftpClient.getReplyCode());
			return b;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (ftpClient != null) {
				try {
					ftpClient.logout();
					ftpClient.disconnect();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 
	 * @param fileName
	 * @param input
	 */
	public Boolean upload(String fileName, InputStream input ){
		return upload(fileName,input,ftpPath);
	}
	

	/**
	 * ftp下载
	 * 
	 * @param fileName
	 *            要下载的文件名
	 * @param localPath
	 *            保存本地路径
	 */
	public void download(String fileName, String localPath) {
		FTPClient ftpClient = getFTPClient(localhost, port, ftpUserName, ftpPassword, ftpPath);
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(localPath);
			ftpClient.retrieveFile(fileName, fos);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (ftpClient != null) {
				try {
					ftpClient.logout();
					ftpClient.disconnect();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	public String getLocalhost() {
		return localhost;
	}

	public void setLocalhost(String localhost) {
		this.localhost = localhost;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getFtpUserName() {
		return ftpUserName;
	}

	public void setFtpUserName(String ftpUserName) {
		this.ftpUserName = ftpUserName;
	}

	public String getFtpPassword() {
		return ftpPassword;
	}

	public void setFtpPassword(String ftpPassword) {
		this.ftpPassword = ftpPassword;
	}

	public String getFtpPath() {
		return ftpPath;
	}

	public void setFtpPath(String ftpPath) {
		this.ftpPath = ftpPath;
	}

	public String getLookPort() {
		return lookPort;
	}

	public void setLookPort(String lookPort) {
		this.lookPort = lookPort;
	}

	public String getFtpLookUrl() {
		return ftpLookUrl;
	}

	public void setFtpLookUrl(String ftpLookUrl) {
		this.ftpLookUrl = ftpLookUrl;
	}

	public String getRemoteSensingFilePath() {
		return remoteSensingFilePath;
	}

	public void setRemoteSensingFilePath(String remoteSensingFilePath) {
		this.remoteSensingFilePath = remoteSensingFilePath;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public String getProcessFilePath() {
		return processFilePath;
	}

	public void setProcessFilePath(String processFilePath) {
		this.processFilePath = processFilePath;
	}
	
	
}
