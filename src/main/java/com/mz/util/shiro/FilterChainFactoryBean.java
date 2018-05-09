package com.mz.util.shiro;

import java.text.MessageFormat;
import java.util.List;
import org.apache.shiro.config.Ini;
import org.apache.shiro.config.Ini.Section;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.mz.entity.ModeuleActionTable;
import com.mz.entity.ModuleAuthorityTable;
import com.mz.service.IModeuleActionTableService;
import com.mz.service.IModuleAuthorityTableService;

public class FilterChainFactoryBean implements FactoryBean<Ini.Section> {

	@Autowired
	IModuleAuthorityTableService moduleAuthorityTableService;
	@Autowired
	IModeuleActionTableService modeuleActionTableService;

	private StringBuffer filter = new StringBuffer();

	public static final String PREMISSION_STRING = " = authc,perms[\"{0}\"]\n";

	public Section getObject() {
		String fiter = "";
		List<ModuleAuthorityTable> moduleAuthorityTables = moduleAuthorityTableService.selectAllModuleAll();

		filter.append("/jsp/login.jsp=anon\n");
		filter.append("/jsp/index.jsp=anon\n");
		filter.append("/test/login.do=anon\n");
		filter.append("/web/**=anon\n");
		filter.append("/userTable/logout.do=authc\n");
		for (ModuleAuthorityTable mAuthorityTable : moduleAuthorityTables) {
			if (!StringUtils.isEmpty(mAuthorityTable.getMenuUrl())) {
				fiter = mAuthorityTable.getMenuUrl()
						+ MessageFormat.format(PREMISSION_STRING, mAuthorityTable.getModuleAuthorityID());
				filter.append(fiter);
			}
		}

		List<ModeuleActionTable> action = modeuleActionTableService.selectModuleActionAll();
		for (ModeuleActionTable mActionTable : action) {
			if (!StringUtils.isEmpty(mActionTable.getActionUrl())) {
				fiter = mActionTable.getActionUrl()
						+ MessageFormat.format(PREMISSION_STRING, mActionTable.getModuleAuthorityID());
				filter.append(fiter);
			}
		}

		// 权限拦截字符串
		System.out.println(filter.toString());
		Ini ini = new Ini();
		ini.load(filter.toString());
		Ini.Section section = ini.getSection(Ini.DEFAULT_SECTION_NAME);
		return section;
	}

	public Class<?> getObjectType() {
		return this.getClass();
	}

	public boolean isSingleton() {
		return false;
	}
}
