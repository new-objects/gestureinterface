{
  description = "Python development tools";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }@attrs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pythonEnv = pkgs.python3.withPackages (ps:
          with ps;
          [
            # Add Python packages here
          ]);
      in {
        devShell = pkgs.mkShell {
          buildInputs = [
            pythonEnv
            # Add other build inputs if necessary
          ];
        };
      });
}
