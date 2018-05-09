package com.mz.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@TableName("remote_sensing_data_table")
public class RemoteSensingDataTable extends Model<RemoteSensingDataTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 遥感影像数据ID
     */
	private Integer remoteSensingDataID;
    /**
     * 节点名称
     */
	private String name;
    /**
     * 遥感图片地址
     */
	private String url;
    /**
     * 父id
     */
	private Integer parentsID;


	public Integer getRemoteSensingDataID() {
		return remoteSensingDataID;
	}

	public void setRemoteSensingDataID(Integer remoteSensingDataID) {
		this.remoteSensingDataID = remoteSensingDataID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getParentsID() {
		return parentsID;
	}

	public void setParentsID(Integer parentsID) {
		this.parentsID = parentsID;
	}

	@Override
	protected Serializable pkVal() {
		return this.remoteSensingDataID;
	}

}
