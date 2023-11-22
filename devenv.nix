{ pkgs, ... }:

{
  difftastic.enable = true;
  starship.enable = true;

  packages = with pkgs; [ nixfmt ];

  languages = {
    javascript = {
      enable = true;
      npm.install.enable = true;
    };
    python = {
      enable = true;
      venv.enable = true;
      version = "3.10";
    };
  };
}
