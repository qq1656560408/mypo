package com.mz.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.alibaba.fastjson.JSONObject;
import com.mz.entity.CheckTable;
import com.mz.service.ICheckTableService;
import com.mz.util.Upload;
import com.mz.vo.InsertCheckUnitMaterial;
import com.mz.vo.selectApplication;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/checkTable")
public class CheckTableController {
	
	@Autowired
	private ICheckTableService checkTableService;
	@Resource
	private Upload upload;
	
	/**
	 * 申请考核指标信息（证明材料）
	 * @param req
	 * @param resp
	 * @param filereq
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("insertCheck")
	public void insertCheck(HttpServletRequest req,HttpServletResponse resp,MultipartHttpServletRequest filereq) throws IOException, Exception {
		int num=Integer.valueOf(req.getParameter("num_index"));
		String str_json=req.getParameter("field");
		String str=req.getParameter("str");
		String[] str_arr=str.split(",");
		//json格式化
		JSONObject jsonobj=JSONObject.parseObject(str_json);
		List<InsertCheckUnitMaterial> arr=new ArrayList<>();
		for(int i=1;i<num+1;i++) {			
			List<MultipartFile> list_file=new ArrayList<>();
			for(int y=0;y<str_arr.length;y++) {
				if(str_arr[y].indexOf("_"+i+"_")!=-1) {
					MultipartFile file=filereq.getFile("file"+str_arr[y]);
					list_file.add(file);
				}
			}
			
			List<String> str_path=new ArrayList<>();
			List<String> list_original=new ArrayList<>();
			for (MultipartFile multfile:list_file) {
	            String fileName = multfile.getOriginalFilename(); //获取文件名
	            String strurl=upload.upload(multfile);
	            str_path.add(strurl);
	            list_original.add(fileName);
	        }
			InsertCheckUnitMaterial objT=new InsertCheckUnitMaterial(jsonobj.getString("projectname_"+i), jsonobj.getString("claim_"+i), str_path,list_original);
			arr.add(objT);
		}
	   int YN=checkTableService.insertCheckTable(arr);
	   PrintWriter out=resp.getWriter();
	   if(YN!=0) {
		   out.println("ok");
	   }else {
		   out.println("no");
	   }
	   out.close();
	   out.flush();
	}
	/**
	 * 分页查询申请信息
	 * @param resp
	 * @param page
	 * @param num
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	@RequestMapping("selectWaitExamine")
	public void selectWaitExamine(HttpServletResponse resp,Integer page,Integer num,Integer auditNo,Integer score) throws IOException, ParseException {
		List<com.mz.vo.selectWaitExamine> list_WaitExamine=new ArrayList<>();
		if(auditNo!=0) {
			
				Integer low=score;
				Integer tall=100;
				if(score==85) {
					tall=100;
				}if(score==75) {
					tall=84;
				}if(score==60) {
					tall=74;
				}if(score==0) {
					tall=59;
				}if(score==100) {
					tall=100;low=0;
				}
				list_WaitExamine=checkTableService.selectWaitExamineBYScore(page, num, low, tall);
		}else {
			list_WaitExamine=checkTableService.selectWaitExamine(page,num,auditNo);
		}
		
		int overall=checkTableService.selectWaitExamineNUM(auditNo);
		if(overall%num!=0) {
			overall=(overall/num)+1;
		}else {
			overall=overall/num;
		}
		PrintWriter out=resp.getWriter();
		JSONObject obj = new JSONObject();
		obj.put("mun", overall);
		obj.put("list", list_WaitExamine);
		out.println(obj.toString());
		out.close();
		out.flush();
	}
	/**
	 * 查询待审核的指标项目（根据单位id）（查询一条）
	 * @param resp
	 * @param checkUnitID
	 * @param dt
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	@RequestMapping("selectWaitExamineDetail")
	@ResponseBody
	public List<com.mz.vo.selectWaitExamine> selectWaitExamineDetail(HttpServletResponse resp,String checkID) throws IOException, ParseException {
		List<com.mz.vo.selectWaitExamine> list_WaitExamineDetail=checkTableService.selectWaitExamineDetail(checkID);
		 return list_WaitExamineDetail;
	}
	/**
	 * 审核指标项目
	 * @param str_arr
	 * @return
	 */
	@RequestMapping("updateWaitExamine")
	@ResponseBody
	public int updateWaitExamine(String str_arr) {
		int k=checkTableService.updateWaitExamineDetail(str_arr);
		return k;
	}
	/**
	 * 查询个人提交记录
	 * @param page
	 * @param num
	 * @param auditNo
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("selectPersonalRecord")
	@ResponseBody
	public void selectPersonalRecord(HttpServletResponse resp,Integer page,Integer num,Integer auditNo) throws IOException{
		Integer auditNo1=0;
		Integer auditNo2=1;
		if(auditNo==-1) {
			
		}else {
			if(auditNo==0) {
				 auditNo1=0;
				 auditNo2=0;
			}else {
				 auditNo1=1;
				 auditNo2=1;
			}
		}
		List<CheckTable> list=checkTableService.selectPersonalRecord(auditNo1, auditNo2, page, num);
		Integer PersonalRecordNUM=checkTableService.selectPersonalRecordNUM(auditNo1, auditNo2);
		if(PersonalRecordNUM%num!=0) {
			PersonalRecordNUM=(PersonalRecordNUM/num)+1;
		}else {
			PersonalRecordNUM=PersonalRecordNUM/num;
		}
		PrintWriter out=resp.getWriter();
		JSONObject obj = new JSONObject();
		obj.put("mun", PersonalRecordNUM);
		obj.put("list", list);
		out.println(obj.toString());
		out.close();
		out.flush();
		
	}
   /**
    * 查询申请考核信息
    * @param page
    * @param num
    * @return
 * @throws IOException 
    */
	@RequestMapping("/selectApplication")
     @ResponseBody
    public void selectApplication(HttpServletResponse resp,Integer page,Integer num) throws IOException{
    	List<selectApplication> list=checkTableService.selectApplication(page,num);
		Integer overall=checkTableService.selectApplicationNUM();
		if(overall%num!=0) {
			overall=(overall/num)+1;
		}else {
			overall=overall/num;
		}
		PrintWriter out=resp.getWriter();
		JSONObject obj = new JSONObject();
		obj.put("mun", overall);
		obj.put("list", list);
		out.println(obj.toString());
		out.close();
		out.flush();
    }
    /**
     * 查询指标项目（全部）（根据id获取时间，在根据时间获取全部）
     */
	@RequestMapping("selectApplicationDetail")
	@ResponseBody
	public List<com.mz.vo.selectApplication> selectApplicationDetail(Integer checkID){
		return checkTableService.selectApplicationDetail(checkID);
		
	}
}
