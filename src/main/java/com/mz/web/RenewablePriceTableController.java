package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.RenewablePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IRenewablePriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowRenewablePrice;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
@Controller
@RequestMapping("/renewablePriceTable")
public class RenewablePriceTableController extends BaseControl{

	@Autowired
	IRenewablePriceTableService renewablePriceTableService;

	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return renewablePriceTableService.insertExcelImport(excelFile);
	}

	@RequestMapping("selectPriceTable")
	@ResponseBody
	public Object selectPriceTable(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;
		int count = renewablePriceTableService.selectCount(null);
		List<ShowRenewablePrice> list = renewablePriceTableService.selectPriceTableLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/RenewableManage/jiaGe/insertRenewablePrice");
	}

	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowRenewablePrice swp = renewablePriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/RenewableManage/jiaGe/updateRenewablePrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year,WaterTypeandFeaturesTable water,RenewablePriceTable renewable) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = renewablePriceTableService.insertPriceTable(water,renewable);
		return isSuccess(i);
	}

	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(RenewablePriceTable renewable) {
		Boolean b = renewablePriceTableService.updatePrice(renewable);
		return "{\"success\":" + b + "}";

	}

	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		Boolean b = renewablePriceTableService.deleteByID(id);
		return "{\"success\":" + b + "}";
	}
}
