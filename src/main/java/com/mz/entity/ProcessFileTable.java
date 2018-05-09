package com.mz.entity;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2018-04-24
 */
@TableName("process_file_table")
public class ProcessFileTable extends Model<ProcessFileTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 水资源过程文件id
     */
	@TableId(value="processFileID", type= IdType.AUTO)
	private Integer processFileID;
    /**
     * 过程文件名称
     */
	private String processFileMC;
    /**
     * 过程文件链接
     */
	private String processFileURL;
	private Integer parentID;


	public Integer getProcessFileID() {
		return processFileID;
	}

	public void setProcessFileID(Integer processFileID) {
		this.processFileID = processFileID;
	}

	public String getProcessFileMC() {
		return processFileMC;
	}

	public void setProcessFileMC(String processFileMC) {
		this.processFileMC = processFileMC;
	}

	public String getProcessFileURL() {
		return processFileURL;
	}

	public void setProcessFileURL(String processFileURL) {
		this.processFileURL = processFileURL;
	}

	public Integer getParentID() {
		return parentID;
	}

	public void setParentID(Integer parentID) {
		this.parentID = parentID;
	}

	@Override
	protected Serializable pkVal() {
		return this.processFileID;
	}

	@Override
	public String toString() {
		return "ProcessFileTable [processFileID=" + processFileID + ", processFileMC=" + processFileMC
				+ ", processFileURL=" + processFileURL + ", parentID=" + parentID + "]";
	}

}
