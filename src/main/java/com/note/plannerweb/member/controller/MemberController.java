package com.note.plannerweb.member.controller;

import com.note.plannerweb.config.model.response.ListResult;
import com.note.plannerweb.config.model.response.SingleResult;
import com.note.plannerweb.config.model.service.ResponseService;
import com.note.plannerweb.config.security.JwtProvider;
import com.note.plannerweb.member.domain.Member;
import com.note.plannerweb.member.dto.*;
import com.note.plannerweb.member.repository.MemberRepository;
import com.note.plannerweb.member.service.MemberService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@Api(tags = {"1. Member"})
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/api")
public class MemberController {

    private final MemberService memberService;

    private final JwtProvider jwtProvider;
    private final ResponseService responseService;

//    /**
//     * 회원정보수정
//     */
//    @ApiOperation(value = "회원 정보 수정",notes = "회원정보를 수정합니다.")
//    @PutMapping("/member")
//    @ResponseStatus(HttpStatus.OK)
//    public void updateBasicInfo(@Valid @RequestBody MemberUpdateDto memberUpdateDto) throws Exception {
//        memberService.update(memberUpdateDto);
//    }
//
//    /**
//     * 비밀번호 수정
//     */
//    @ApiOperation(value = "비밀번호 수정",notes = "비밀번호를 수정합니다.")
//    @PutMapping("/member/password")
//    @ResponseStatus(HttpStatus.OK)
//    public void updatePassword(@Valid @RequestBody UpdatePasswordDto updatePasswordDto) throws Exception {
//        memberService.updatePassword(updatePasswordDto.checkPassword(),updatePasswordDto.toBePassword());
//    }
//
//
//    /**
//     * 회원탈퇴
//     */
//    @ApiOperation(value = "회원탈퇴",notes = "회원탈퇴를 합니다.")
//    @DeleteMapping("/member")
//    @ResponseStatus(HttpStatus.OK)
//    public void withdraw(@RequestBody MemberWithdrawDto memberWithdrawDto) throws Exception {
//        memberService.withdraw(memberWithdrawDto.checkPassword());
//    }
//
//
    /**
     * 회원정보조회
     */

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "X-AUTH-TOKEN",
                    value = "로그인 성공 후 AccessToken",
                    required = true, dataType = "String",paramType = "header"
            )
    })
    @ApiOperation(value = "회원정보조회",notes = "회원정보를 조회합니다.")
    @GetMapping("/members/token")
    public SingleResult<MemberResponseDto> getMember(HttpServletRequest request){
        return this.responseService.getSingleResult(this.memberService.findByToken(jwtProvider.resolveToken(request)));
    }

//    @ApiOperation(value="회원정보조회 : 이메일",notes = "이메일로 회원정보를 조회합니다.")
//    @GetMapping("/members/email/{email}")
//    public SingleResult<MemberResponseDto> findMemberByEmail(@Valid @PathVariable("email")String email){
//        return this.responseService.getSingleResult(this.memberService.findByEmail(email));
//    }

//    @ApiOperation(value="회원 수정 : Id",notes = "회원정보를 수정합니다.")
//    @PutMapping("/members/{id}")
//    public SingleResult<Long> updateMember(@Valid @PathVariable("id")Long id){
//    }

    @ApiOperation(value = "회원정보 목록조회",notes = "회원종보 목록을 조회합니다.")
    @GetMapping("/members")
    public ListResult<MemberResponseDto> getMemberList(){
        return this.responseService.getListResult(this.memberService.getMemberList());
    }

    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "X-AUTH-TOKEN",
                    value = "로그인 성공 후 AccessToken",
                    required = true, dataType = "String",paramType = "header"
            )
    })
    @ApiOperation(value="회원 삭제",notes = "회원을 삭제합니다.")
    @DeleteMapping("/members/{id}")
    public SingleResult<MemberResponseDto> deleteMember(@PathVariable Long id){
        MemberResponseDto responseDto=this.memberService.findById(id);
        this.memberService.deleteById(id);
        return this.responseService.getSingleResult(responseDto);
    }

//    /**
//     * 내정보조회
//     */
//    @ApiOperation(value = "내정보 조회",notes = "내정보를 조회 합니다.")
//    @GetMapping("/member")
//    public ResponseEntity getMyInfo(HttpServletResponse response) throws Exception {
//
//        MemberInfoDto info = memberService.getMyInfo();
//        return new ResponseEntity(info, HttpStatus.OK);
//    }
}
