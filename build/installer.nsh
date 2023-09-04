!include 'FileFunc.nsh'
!insertmacro Locate

!macro customInit
    # 修改默认安装路径
    StrCpy $INSTDIR "D:\test"
!macroend

!macro customHeader
  ShowInstDetails show
  ShowUninstDetails show
!macroend
