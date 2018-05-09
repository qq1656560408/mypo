package com.mz.service;

import com.mz.entity.UserTable;
import com.mz.vo.SelectUserTable;
import com.mz.vo.ShowAtmoshpherePhyQuantity;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface IUserTableService extends IService<UserTable> {
	    List<UserTable> selectUserTables(String userName,String passwork);

		List<UserTable>selectUserTablesall();

		Boolean deletebyuserID(int userID);
		
		int insertUser(UserTable y);
		
		List<UserTable> insertUser(int assistantID);
		
		SelectUserTable selectUpdate(int id);
		
		int  updateUserimfo(UserTable updateUser);


}
