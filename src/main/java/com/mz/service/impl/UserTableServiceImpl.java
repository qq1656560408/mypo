package com.mz.service.impl;

import com.mz.entity.UserTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.UserTableMapper;
import com.mz.service.IUserTableService;
import com.mz.vo.SelectUserTable;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
import com.mz.vo.ShowRemoteSensing;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Service
public class UserTableServiceImpl extends ServiceImpl<UserTableMapper, UserTable> implements IUserTableService {

	@Autowired
	UserTableMapper userTableMapper;
	


	@Override
	public List<UserTable> selectUserTables(String userName, String passwork) {
		return userTableMapper.selectUserTable(userName,passwork);
	}
	
	@Override
	public List<UserTable> selectUserTablesall(){
		     return userTableMapper.selectUserTablesall();
	}
	
	//删除
	@Override
	public Boolean  deletebyuserID(int userID){
		int affect = userTableMapper.deletebyuserID(userID);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}		
	}
	
	//新增
	@Override
	public int insertUser(UserTable y) {
	    int yy= userTableMapper.insertUser(y);  //影响行数
	   return yy;    //成功返回1，不成功返回0
	}

	@Override
	public List<UserTable> insertUser(int assistantID) {
		// TODO Auto-generated method stub
		return null;
	}
     

	//查看修改
	@Override
	public SelectUserTable selectUpdate(int id){
		return userTableMapper.selectUpdate(id);
	}
	
	
	//修改
	@Override
	public int   updateUserimfo (UserTable y){
	   int qqq= userTableMapper.updateUserimfo(y);
		  return qqq;
	}
	
}
