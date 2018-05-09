package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.mz.service.IModuleAuthorityTableService;
import com.mz.vo.SelectModuleAuthority;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-26
 */
@Controller
@RequestMapping("/moduleAuthorityTable")
public class MineValueTableController {
	@Autowired
	private IModuleAuthorityTableService moduleAuthorityTableService;
	
	@RequestMapping("selectTree")
	@ResponseBody
	public Object selectTree(){
		List<SelectModuleAuthority> list=moduleAuthorityTableService.selectModuleAuthorities(0);
		return list;
	}
}
